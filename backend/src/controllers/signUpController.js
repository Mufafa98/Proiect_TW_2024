const getBody = require("../utils/getReqBody");
const validate = require("../utils/validators");
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
async function signUpUser(req, res) {
	const response = await getBody(req);
	if (response.type === "json") {
		const { username, email, password } = response.body;
		if (
			username === undefined ||
			email === undefined ||
			password === undefined
		) {
			const message =
				"Invalid JSON format. Expected: {email, username, " + "password}";
			sendResponse.JSON(res, message, statusCodes.INVALID_JSON_FORMAT);
		} else {
			if (await validate.email(email)) {
				const user = await userServices.getUserByEmail(email);
				const userByU = await userServices.getUserByUsername(username);
				if (user.found || userByU.found) {
					const message = "User already Exists";
					sendResponse.JSON(res, message, statusCodes.USER_EXISTS);
				} else {
					userServices.insertUser(
						username,
						email,
						await passwordServices.hash(password),
					);
					const userId = await userServices.getUserByUsername(username);
					const message = "User SignedUp succesfully";
					const userData = { uid: userId };
					const token = generateAccessToken(userData);
					// sendResponse.customJSON(
					// 	res,
					// 	{
					// 		message: message,
					// 		token: token,
					// 	},
					// 	httpStatus.OK,
					// );

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
				const message =
					"Invalid email format. Expected " + "<uname>@<domain>.<identifier>";
				sendResponse.JSON(res, message, statusCodes.INVALID_EMAIL);
			}
		}
	} else {
		const message = "The signUp endpoint expects a json";
		sendResponse.JSON(res, message, httpStatus.BAD_REQUEST);
	}
}

module.exports = signUpUser;
