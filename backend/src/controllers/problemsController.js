const problemsServices = require("../services/problemsServices");
const sendResponse = require("../utils/sendResponse");
const getReqBody = require("../utils/getReqBody");
const httpStatus = require("http-status-codes").StatusCodes;
const statusCodes = require("../utils/statusCodes");
const userServices = require("../services/userServices");
const cookiesServices = require("../services/cookiesServices");
const jwtAuthentication = require("../utils/JWT/JWTAuthentication");
const jwtDecoder = require("../utils/JWT/JWTDecoder");
const getBody = require("../utils/getReqBody");


/**
 * Handles problem retrieval
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
async function get(req, res) {
	const cookieHeader = req.headers.cookie ? req.headers.cookie : "";
	const cookies = await cookiesServices.parseCookies(cookieHeader);
	const jwtToken = cookies.token;
	if (jwtAuthentication(jwtToken) === 200) {
		const decodedReq = await getReqBody(req);
		const reqBody = decodedReq.body;
		const id = reqBody.id;
		const type = reqBody.type;
		const query = reqBody.query;
		const uid = (await jwtDecoder(jwtToken)).userData.uid;
		if (decodedReq.type === "query" && id !== "") {
			if (id === undefined)
				sendResponse.JSON(res, "Invalid params", httpStatus.BAD_REQUEST);
			else {
				let problems = await getById(id);

				if (type === "run" && query !== "") {
					const problemQuery = (await problemsServices.getProblemQuery(id))
						.data;
					const querryResponse = await problemsServices.runQueryToString(query);
					const problemResponse =
						await problemsServices.runQueryToString(problemQuery);
					if (!querryResponse.error)
						sendResponse.JSON(
							res,
							{
								expected: problemResponse,
								got: querryResponse.result,
							},
							200,
						);
					else
						sendResponse.JSON(
							res,
							querryResponse.result,
							statusCodes.INVALID_SQL_STATEMENT,
						);
				} else if (type === "submit" && query !== "" && uid !== "") {
					const solutionResult = await problemsServices.compareSolution(
						query,
						id,
					);
					problemsServices.logProblem(id, uid, query, solutionResult.result);
					sendResponse.JSON(res, solutionResult, 200);
				} else {
					if (reqBody.data === "true") problems = await getProblemDataById(id);
					else problems = await getById(id);

					if (problems.found) sendResponse.customJSON(res, problems.data, 200);
					else
						sendResponse.JSON(
							res,
							"Problem not found",
							statusCodes.INEXISTENT_PROBLEM,
						);
				}
			}
		} else {
			const problems = await getAll();
			sendResponse.customJSON(res, problems.data, 200);
		}
	} else {
		sendResponse.JSON(res, "Forbiden", httpStatus.FORBIDDEN);
	}
}

/**
 * Returns all the problems in the database
 * @returns {found: Boolean, data: any}
 */
async function getAll() {
	const problems = await problemsServices.getAll();
	return problems;
}
/**
 * Returns problems by id
 * @returns {found: Boolean, data: any}
 */
async function getById(id) {
	const problems = await problemsServices.getById(id);
	return problems;
}
/**
 * Returns problem data by id
 * @returns {found: Boolean, data: any}
 */
async function getProblemDataById(id) {
	const problems = await problemsServices.getProblemDataById(id);
	return problems;
}

async function post(req, res) {
	const response = await getBody(req);

	if (response.type === "json") {
		const { title, chapter, difficulty, content, solution } = response.body;
		if (
			title === undefined ||
			chapter === undefined ||
			difficulty === undefined ||
			content === undefined ||
			solution === undefined
		) {
			const message =
				"Invalid JSON format. Expected: {title, chapter, difficulty, content, description}";
			sendResponse.JSON(res, message, statusCodes.INVALID_JSON_FORMAT);
		} else {
			const problem = await problemsServices.getProblemByTitle(title);
			if (problem.found) {
				const message =
					"Problem with this title already exists. Change the title";
				sendResponse.JSON(res, message, statusCodes.PROBLEM_TITLE_EXISTS);
			} else {
				problemsServices.insertProblem(title, chapter, difficulty);
				problemsServices.insertSolution(title, content, solution);
				const message = "Problem uploaded succesfully";
				sendResponse.customJSON(res, { message: message }, 200);
			}
		}
	}
}
/**
 * Handles user rating system
 * If an user already voted a problem, a second vote should not be possible
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
async function canRate(req, res) {
	const cookieHeader = req.headers.cookie ? req.headers.cookie : "";
	const cookies = await cookiesServices.parseCookies(cookieHeader);
	const jwtToken = cookies.token;
	if (jwtAuthentication(jwtToken) === 200) {
		const decodedReq = await getReqBody(req);
		const reqBody = decodedReq.body;
		const reqType = decodedReq.type;
		const uid = (await jwtDecoder(jwtToken)).userData.uid;
		const pid = reqBody.pid;
		if (reqType === "query") {
			if (uid === undefined || pid === undefined) {
				sendResponse.JSON(
					res,
					"Invalid fields",
					statusCodes.INVALID_JSON_FORMAT,
				);
			} else {
				const canRate = await problemsServices.canBeRatedBy(uid, pid);
				if (canRate.found) {
					sendResponse.JSON(res, "Can rate", 200);
				} else {
					sendResponse.JSON(res, "Can't rate", statusCodes.UNABLE_TO_RATE);
				}
			}
		} else
			sendResponse.JSON(
				res,
				"Invalid query format",
				statusCodes.INVALID_JSON_FORMAT,
			);
	} else {
		sendResponse.JSON(res, "Forbidden", httpStatus.FORBIDDEN);
	}
}

/**
 * Handles user rating system
 * Adds in the database the rate of the user regarding the problem
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
async function rate(req, res) {
	const cookieHeader = req.headers.cookie ? req.headers.cookie : "";
	const cookies = await cookiesServices.parseCookies(cookieHeader);
	const jwtToken = cookies.token;
	if (jwtAuthentication(jwtToken) === 200) {
		const decodedReq = await getReqBody(req);
		const reqBody = decodedReq.body;
		const uid = (await jwtDecoder(jwtToken)).userData.uid;
		const pid = reqBody.pid;
		const raiting = reqBody.raiting;
		if (decodedReq.type === "json") {
			if (uid === undefined || pid === undefined || raiting === undefined) {
				sendResponse.JSON(
					res,
					"Invalid fields",
					statusCodes.INVALID_JSON_FORMAT,
				);
			} else {
				const userExists = await userServices.getUserById(uid);
				const problemExists = await problemsServices.getById(pid);
				if (userExists.found && problemExists.found) {
					await problemsServices.rate(uid, pid, raiting);
					sendResponse.JSON(res, "Can rate", 200);
				} else {
					sendResponse.JSON(res, "Can't rate", statusCodes.UNABLE_TO_RATE);
				}
			}
		} else
			sendResponse.JSON(
				res,
				"Invalid JSON format",
				statusCodes.INVALID_JSON_FORMAT,
			);
	} else {
		sendResponse(res, "Forbidden", httpStatus.FORBIDDEN);
	}
}

module.exports = { get: get, canRate: canRate, post: post, rate: rate };
