const getBody = require("../utils/getReqBody");
const validate = require("../utils/validators");
const httpStatus = require("http-status-codes").StatusCodes;
const sendResponse = require("../utils/sendResponse");
const userServices = require("../services/userServices")
const passwordServices = require("../services/passwordServices")
const statusCodes = require("../utils/statusCodes");
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
        if (username === undefined ||
            email === undefined ||
            password === undefined) {
            const message = "Invalid JSON format. Expected: {email, username, "
                + "password}"
            sendResponse.JSON(res, message, statusCodes.INVALID_JSON_FORMAT);
        }
        else {
            if (await validate.email(email)) {
                const user = await userServices.getUserByEmail(email);
                const userByU = await userServices.getUserByUsername(username);
                if (user.found || userByU.found) {
                    const message = "User already Exists"
                    sendResponse.JSON(res, message, statusCodes.USER_EXISTS);
                }
                else {
                    userServices.insertUser(
                        username,
                        email,
                        await passwordServices.hash(password)
                    )
                    const userId = (await userServices.getUserByUsername(username))
                    const message = "User SignedUp succesfully"
                    sendResponse.customJSON(res, {
                        message: message,
                        uid: userId.data.ID,
                    }, httpStatus.OK);
                }

            }
            else {
                const message = "Invalid email format. Expected " +
                    "<uname>@<domain>.<identifier>"
                sendResponse.JSON(res, message, statusCodes.INVALID_EMAIL);
            }
        }
    }
    else {
        const message = "The signUp endpoint expects a json";
        sendResponse.JSON(res, message, httpStatus.BAD_REQUEST);
    }
}

module.exports = signUpUser;