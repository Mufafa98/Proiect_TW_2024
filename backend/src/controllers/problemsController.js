const problemsServices = require("../services/problemsServices")
const sendResponse = require("../utils/sendResponse")
const getReqBody = require("../utils/getReqBody")
const httpStatus = require("http-status-codes").StatusCodes;
const statusCodes = require("../utils/statusCodes")

async function get(req, res) {
    const reqBody = await getReqBody(req);
    if (reqBody.type === "query" && reqBody.body.id !== "") {
        if (reqBody.body.id === undefined)
            sendResponse.JSON(res, "Invalid params", httpStatus.BAD_REQUEST)
        else {
            const problems = await getById(reqBody.body.id);
            if (problems.found)
                sendResponse.customJSON(res, problems.data, 200);
            else
                sendResponse.JSON(res, "Problem not found", statusCodes.INEXISTENT_PROBLEM)
        }
    }
    else {
        const problems = await getAll();
        sendResponse.customJSON(res, problems.data, 200);
    }
}

async function getAll() {
    const problems = await problemsServices.getAll();
    return problems
}
async function getById(id) {
    const problems = await problemsServices.getById(id);
    return problems
}

module.exports = { get: get }