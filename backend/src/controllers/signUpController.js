const getBody = require("../utils/getReqBody");
const validate = require("../utils/validators");
const httpStatus = require("http-status-codes").StatusCodes;
const sendResponse = require("../utils/sendResponse");
const userServices = require("../services/userServices")

const passwordServices = require("../services/passwordServices")

async function signUpUser(req, res) {
    const response = await getBody(req);
    if (response.type === "json") {
        const { username, email, password } = response.body;
        if (username === undefined ||
            email === undefined ||
            password === undefined) {
            const message = "Invalid JSON format. Expected: {email, username, "
                + "password}"
            sendResponse.JSON(res, message, httpStatus.BAD_REQUEST);
        }
        else {
            if (await validate.email(email)) {
                const user = userServices.getUserByEmail(email);
                if ((await user).found) {
                    const message = "User already Exists"
                    sendResponse.JSON(res, message, httpStatus.NOT_ACCEPTABLE);
                }
                else {
                    userServices.insertUser(
                        username,
                        email,
                        await passwordServices.hash(password)
                    )
                    const message = "User SignedUp succesfully"
                    sendResponse.JSON(res, message, httpStatus.OK);
                }

            }
            else {
                const message = "Invalid email format. Expected " +
                    "<uname>@<domain>.<identifier>"
                sendResponse.JSON(res, message, httpStatus.NOT_ACCEPTABLE);
            }
        }
    }
    else {
        const message = "The signUp endpoint expects a json";
        sendResponse.JSON(res, message, httpStatus.BAD_REQUEST);
    }
}

module.exports = signUpUser;