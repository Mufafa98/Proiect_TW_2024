const userServices = require("../services/userServices");
const httpStatus = require("http-status-codes").StatusCodes;

const sendResponse = require("../utils/sendResponse");
const getReqBody = require("../utils/getReqBody");
const cookiesServices = require("../services/cookiesServices");
const jwtAuthentication = require("../utils/JWT/JWTAuthentication");

class LeaderboardController {
    async get(req, res) {
        const cookieHeader = req.headers.cookie ? req.headers.cookie : "";
        const cookies = await cookiesServices.parseCookies(cookieHeader);
        const jwtToken = cookies.token;
        if (jwtAuthentication(jwtToken) === 200) {
            const decodedReq = await getReqBody(req);
            const reqBody = decodedReq.body;
            const category = reqBody.category;
            const difficulty = reqBody.difficulty;
            if (category === undefined || difficulty === undefined) {
                sendResponse.JSON(res, "Bad request", httpStatus.BAD_REQUEST);
                return;
            }
            const id = reqBody.id;
            if (id !== undefined) {
                const leaderboard = {
                    found: true,
                    data: {
                        byId: await userServices.getTopUsersById(category, difficulty, id),
                        byUsername: await userServices.getTopUsersByUsername(category, difficulty, id),
                    }
                }
                sendResponse.customJSON(res, leaderboard, httpStatus.OK);
            }
            else {
                const leaderboard = await userServices.getTopUsers(category, difficulty);
                sendResponse.customJSON(res, leaderboard, httpStatus.OK);
            }
        } else {
            sendResponse.JSON(res, "Forbiden", httpStatus.FORBIDDEN);
        }
    }
}

module.exports = new LeaderboardController();