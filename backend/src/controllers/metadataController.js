const httpStatus = require("http-status-codes").StatusCodes;
const sendResponse = require("../utils/sendResponse");
const userServices = require("../services/userServices");
const passwordServices = require("../services/passwordServices");
const statusCodes = require("../utils/statusCodes");
const generateAccessToken =
    require("../utils/JWT/JWTGeneration").generateAccessToken;
const cookiesServices = require("../services/cookiesServices");
const problemsServices = require("../services/problemsServices");

const jwtAuthentication = require("../utils/JWT/JWTAuthentication");

class MetadataController {
    async getChapters(req, res) {
        const cookieHeader = req.headers.cookie ? req.headers.cookie : "";
        const cookies = await cookiesServices.parseCookies(cookieHeader);
        const jwtToken = cookies.token;
        if (jwtAuthentication(jwtToken) === 200) {
            const chapters = await problemsServices.getChapters();
            sendResponse.customJSON(res, chapters, 200)
        } else {
            sendResponse.JSON(res, "Forbiden", httpStatus.FORBIDDEN);
        }
    }
    async getTournamentChapters(req, res) {
        const cookieHeader = req.headers.cookie ? req.headers.cookie : "";
        const cookies = await cookiesServices.parseCookies(cookieHeader);
        const jwtToken = cookies.token;
        if (jwtAuthentication(jwtToken) === 200) {
            const chapters = await problemsServices.getTournamentChapters();
            sendResponse.customJSON(res, chapters, 200)
        } else {
            sendResponse.JSON(res, "Forbiden", httpStatus.FORBIDDEN);
        }
    }
    async getTournamentDifficulty(req, res) {
        const cookieHeader = req.headers.cookie ? req.headers.cookie : "";
        const cookies = await cookiesServices.parseCookies(cookieHeader);
        const jwtToken = cookies.token;
        if (jwtAuthentication(jwtToken) === 200) {
            const chapters = await problemsServices.getTournamentDifficulty();
            sendResponse.customJSON(res, chapters, 200)
        } else {
            sendResponse.JSON(res, "Forbiden", httpStatus.FORBIDDEN);
        }
    }
}

module.exports = new MetadataController();
