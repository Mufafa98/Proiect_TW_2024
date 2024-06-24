const sendResponse = require("../utils/sendResponse")
const cookiesServices = require("../services/cookiesServices");
const jwtAuthentication = require("../utils/JWT/JWTAuthentication");
const jwtDecoder = require("../utils/JWT/JWTDecoder");
const userServices = require("../services/userServices");

async function protectedController(req, res) {
    const cookieHeader = req.headers.cookie ? req.headers.cookie : "";
    const cookies = await cookiesServices.parseCookies(cookieHeader);
    const jwtToken = cookies.token;
    sendResponse.JSON(res, "JWT validation", jwtAuthentication(jwtToken));
}

async function protectedControllerAdmin(req, res) {
    const cookieHeader = req.headers.cookie ? req.headers.cookie : "";
    const cookies = await cookiesServices.parseCookies(cookieHeader);
    const jwtToken = cookies.token;
    if ((await userServices.isUserAdmin((await jwtDecoder(jwtToken)).userData.uid)) === 0)
        sendResponse.JSON(res, "admin validation", 403);
    else
        sendResponse.JSON(res, "admin validation", 200);
}

module.exports = {
    protectedController: protectedController,
    protectedControllerAdmin: protectedControllerAdmin
};