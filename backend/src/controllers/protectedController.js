const sendResponse = require("../utils/sendResponse")
const cookiesServices = require("../services/cookiesServices");
const jwtAuthentication = require("../utils/JWT/JWTAuthentication");

async function protectedController(req, res) {
    const cookieHeader = req.headers.cookie ? req.headers.cookie : "";
    const cookies = await cookiesServices.parseCookies(cookieHeader);
    const jwtToken = cookies.token;
    sendResponse.JSON(res, "JWT validation", jwtAuthentication(jwtToken));
}

module.exports = protectedController;