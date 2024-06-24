const getBody = require("../utils/getReqBody");
const httpStatus = require("http-status-codes").StatusCodes;
const sendResponse = require("../utils/sendResponse");
const userServices = require("../services/userServices");
const passwordServices = require("../services/passwordServices");
const statusCodes = require("../utils/statusCodes");
const generateAccessToken =
	require("../utils/JWT/JWTGeneration").generateAccessToken;
const cookiesServices = require("../services/cookiesServices");
const jwtAuthentication = require("../utils/JWT/JWTAuthentication")
const jwtDecoder = require("../utils/JWT/JWTDecoder");

/**
 * Handles user sign-up.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
async function loginUser(req, res) {
	const response = await getBody(req);
	if (response.type === "json") {
		const { username, password } = response.body;
		if (username === undefined || password === undefined) {
			const message = "Invalid JSON format. Expected: {username, password}";
			sendResponse.JSON(res, message, statusCodes.INVALID_JSON_FORMAT);
		} else {
			const user = await userServices.getUserByUsername(username);
			if (user.found) {
				const passMatch = await passwordServices.compare(
					password,
					user.data.PASSWORD,
				);
				if (!passMatch) {
					const message = "Wrong Password";
					sendResponse.JSON(res, message, statusCodes.WRONG_PASSWORD);
				} else {
					const userData = { uid: user.data.ID };
					const token = generateAccessToken(userData);
					const options = cookiesServices.createOptions();
					options.Path = "/";
					options.HttpOnly = false;
					options.SameSite = "Strict";
					const adminProp = await userServices.isUserAdmin(userData.uid);
					const cookie = [
						cookiesServices.setCookie(
							res,
							"token",
							token,
							options,
						),
						cookiesServices.setCookie(
							res,
							"admin",
							await userServices.isUserAdmin(userData.uid),
							options,
						)
					];
					sendResponse.cookie(res, cookie, 200);
				}
			} else {
				const message = "User does not exists";
				sendResponse.JSON(res, message, statusCodes.INEXISTENT_USER);
			}
		}
	} else {
		const message = "The signUp endpoint expects a json";
		sendResponse.JSON(res, message, httpStatus.BAD_REQUEST);
	}
}

async function getAllUsers(req, res) {
	const cookieHeader = req.headers.cookie ? req.headers.cookie : "";
	const cookies = await cookiesServices.parseCookies(cookieHeader);
	const jwtToken = cookies.token;
	if (jwtAuthentication(jwtToken) === 200) {
		if ((await userServices.isUserAdmin((await jwtDecoder(jwtToken)).userData.uid)) === 0)
			return;
		const usernames = await userServices.getAllUsernames();
		console.log(usernames);
		sendResponse.customJSON(res, usernames, 200);
		// return usernames;
	} else {
		sendResponse.JSON(res, "Forbiden", httpStatus.FORBIDDEN);
	}
}

module.exports = { loginUser: loginUser, getAllUsers: getAllUsers };
