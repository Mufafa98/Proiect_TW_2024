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
					const problemQuery = (await problemsServices.getProblemQuery(id)).data
					const querryResponse = await problemsServices.runQueryToString(query)
					const problemResponse = await problemsServices.runQueryToString(problemQuery)
					if (!querryResponse.error)
						sendResponse.JSON(
							res,
							{
								expected: problemResponse,
								got: querryResponse.result,
							},
							200
						);
					else
						sendResponse.JSON(res, querryResponse.result, statusCodes.INVALID_SQL_STATEMENT);
				}
				else if (type === "submit" && query !== "" && uid !== "") {
					const solutionResult = await problemsServices.compareSolution(query, id);
					if (!solutionResult.error)
						problemsServices.logProblem(id, uid, query, solutionResult.result)
					sendResponse.JSON(res, solutionResult, 200);
				}
				else {
					if (reqBody.data === "true")
						problems = await getProblemDataById(id);
					else {
						problems = {
							found: true,
							data: {
								byId: await getById(id),
								byTitle: await getByTitle(id),
								byChapter: await getByChapter(id),
								byDifficulty: await getByDifficulty(id),
							}
						}
					}


					if (problems.found) sendResponse.customJSON(res, problems.data, 200);
					else
						sendResponse.JSON(
							res,
							"Problem not found",
							statusCodes.INEXISTENT_PROBLEM,
						);
				}
			}
		}

		else {
			const problems = await getAll();
			sendResponse.customJSON(res, problems.data, 200);
		}
	} else {
		sendResponse.JSON(res, "Forbiden", httpStatus.FORBIDDEN);
	}
}

/**
 * Handles problem retrieval for tournaments
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
async function getTournamentProblem(req, res) {
	const cookieHeader = req.headers.cookie ? req.headers.cookie : "";
	const cookies = await cookiesServices.parseCookies(cookieHeader);
	const jwtToken = cookies.token;
	if (jwtAuthentication(jwtToken) === 200) {
		const decodedReq = await getReqBody(req);
		const reqBody = decodedReq.body;
		if (reqBody.chapter === undefined || reqBody.difficulty === undefined) {
			sendResponse.JSON(res, "Bad Request", httpStatus.BAD_REQUEST);
			return;
		}
		const chapter = reqBody.chapter === "All" ? "%" : reqBody.chapter;
		const difficulty = reqBody.difficulty === "All" ? "%" : reqBody.difficulty;
		const id = await problemsServices.getTournamentProblem(chapter, difficulty);
		if (id.found) {
			sendResponse.customJSON(res, id.data.at(0).id, 200);
		}
		else {
			sendResponse.JSON(res, "Inexistent problem", statusCodes.INEXISTENT_PROBLEM);
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
 * Returns problems by title
 * @returns {found: Boolean, data: any}
 */
async function getByTitle(title) {
	const problems = await problemsServices.getByTitle(title);
	return problems
}
/**
 * Returns problems by chapter
 * @returns {found: Boolean, data: any}
 */
async function getByChapter(chapter) {
	const problems = await problemsServices.getByChapter(chapter);
	return problems
}
/**
 * Returns problems by difficulty
 * @returns {found: Boolean, data: any}
 */
async function getByDifficulty(difficulty) {
	const problems = await problemsServices.getByDifficulty(difficulty);
	return problems
}
/**
 * Returns problem data by id
 * @returns {found: Boolean, data: any}
 */
async function getProblemDataById(id) {
	const problems = await problemsServices.getProblemDataById(id);
	return problems;
}

//returns the titles of problems that are rated as wrong
async function getReportedProblems(req, res) {
	const problems = await problemsServices.getReportedProblems();
	//console.log(problems);
	sendResponse.customJSON(res, problems, 200);
	return problems;
}

async function post(req, res) {
	const response = await getBody(req);

	if (response.type === "json") {
		const { title, chapter, difficulty, content, solution } = response.body;
		console.log(response);
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
			if(difficulty != "Easy" && difficulty != "Medium" && difficulty != "Hard") {
				const message = "Invalid difficulty. Must be Easy, Medium or Hard";
				sendResponse.JSON(res, message, statusCodes.INVALID_DIFFICULTY);
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

async function download(req, res) {
	const cookieHeader = req.headers.cookie ? req.headers.cookie : "";
	const cookies = await cookiesServices.parseCookies(cookieHeader);
	const jwtToken = cookies.token;
	if (jwtAuthentication(jwtToken) === 200) {
		const decodedReq = await getReqBody(req);
		const reqBody = decodedReq.body;
		const id = reqBody.id;
		const filter = reqBody.filter;
		if (id !== undefined && filter !== undefined) {
			let problems;
			switch (filter) {
				case "0":
					problems = await getById(id);
					break;
				case "1":
					problems = await getByTitle(id);
					break;
				case "2":
					problems = await getByChapter(id);
					break;
				case "3":
					problems = await getByDifficulty(id);
					break;
				case "4":
					problems = await getAll();
					break;
				default:
					break;
			}
			if (problems.found) {
				for (const problem of problems.data) {
					problem.Description = (await
						problemsServices
							.getProblemDataById(problem.id)).data.at(0).content;



				}
				sendResponse.customJSON(res, problems.data, 200);
			}
			else
				sendResponse.JSON(res, "Problem not found", statusCodes.INEXISTENT_PROBLEM)

		}
		else
			sendResponse.JSON(res, "Invalid params", httpStatus.BAD_REQUEST)
	}
	else {
		sendResponse.JSON(res, "Forbiden", httpStatus.FORBIDDEN);
	}
}

module.exports = {
	get: get,
	canRate: canRate,
	rate: rate,
	download: download,
	tournament: getTournamentProblem,
  getReportedProblems: getReportedProblems, 
  post: post,
}