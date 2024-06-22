const commentsServices = require("../services/commentsServices");
const JWTDecoder = require("../utils/JWT/JWTDecoder");
const httpStatus = require("http-status-codes").StatusCodes;

const sendResponse = require("../utils/sendResponse");
const getReqBody = require("../utils/getReqBody");
const cookiesServices = require("../services/cookiesServices");
const jwtAuthentication = require("../utils/JWT/JWTAuthentication");

class CommentsController {
    async comment(req, res) {
        const cookieHeader = req.headers.cookie ? req.headers.cookie : "";
        const cookies = await cookiesServices.parseCookies(cookieHeader);
        const jwtToken = cookies.token;
        if (jwtAuthentication(jwtToken) === 200) {
            const decodedReq = await getReqBody(req);
            const reqBody = decodedReq.body;
            const pid = reqBody.pid;
            const message = reqBody.message;
            const uid = (await JWTDecoder(jwtToken)).userData.uid;
            if (pid === undefined || uid === undefined || message === undefined) {
                sendResponse.JSON(res, "Bad request", httpStatus.BAD_REQUEST);
                return;
            }
            commentsServices.comment(uid, pid, message);
            sendResponse.JSON(res, "Success", httpStatus.OK);
        } else {
            sendResponse.JSON(res, "Forbiden", httpStatus.FORBIDDEN);
        }
    }

    async getAll(req, res) {
        const cookieHeader = req.headers.cookie ? req.headers.cookie : "";
        const cookies = await cookiesServices.parseCookies(cookieHeader);
        const jwtToken = cookies.token;
        if (jwtAuthentication(jwtToken) === 200) {
            const decodedReq = await getReqBody(req);
            const reqBody = decodedReq.body;
            const pid = reqBody.pid;
            if (pid === undefined) {
                sendResponse.JSON(res, "Bad request", httpStatus.BAD_REQUEST);
                return;
            }
            const comments = await commentsServices.getByPid(pid);
            sendResponse.customJSON(res, comments, httpStatus.OK);
        } else {
            sendResponse.JSON(res, "Forbiden", httpStatus.FORBIDDEN);
        }
    }
}

module.exports = new CommentsController();