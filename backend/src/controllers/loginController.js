const getBody = require("../utils/getReqBody");
const httpStatus = require("http-status-codes").StatusCodes;
const sendResponse = require("../utils/sendResponse");
const userServices = require("../services/userServices")
const passwordServices = require("../services/passwordServices")
const statusCodes = require("../utils/statusCodes")

/**
 * Handles user sign-up.
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
async function signUpUser(req, res) {
    const response = await getBody(req);
    if (response.type === "json") {
        const { username, password } = response.body;
        if (username === undefined ||
            password === undefined) {
            const message = "Invalid JSON format. Expected: {username, password}"
            sendResponse.JSON(res, message, statusCodes.INVALID_JSON_FORMAT);
        }
        else {
            const user = await userServices.getUserByUsername(username);
            if (user.found) {
                const passMatch = await passwordServices.compare(password, user.data.PASSWORD)
                if (!passMatch) {
                    const message = "Wrong Password"
                    sendResponse.JSON(res, message, statusCodes.WRONG_PASSWORD);
                }
                else {
                    const message = "User logged in succesfully"
                    sendResponse.customJSON(res, {
                        message: message,
                        uid: user.data.ID,
                    }, httpStatus.OK);
                }
            }
            else {
                const message = "User does not exists"
                sendResponse.JSON(res, message, statusCodes.INEXISTENT_USER);
            }


        }
    }
    else {
        const message = "The signUp endpoint expects a json";
        sendResponse.JSON(res, message, httpStatus.BAD_REQUEST);
    }
}

module.exports = signUpUser;