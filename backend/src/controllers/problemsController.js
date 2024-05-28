const problemsServices = require("../services/problemsServices")
const sendResponse = require("../utils/sendResponse")
const getReqBody = require("../utils/getReqBody")
const httpStatus = require("http-status-codes").StatusCodes;
const statusCodes = require("../utils/statusCodes")

async function get(req, res) {
    const decodedReq = await getReqBody(req);
    const reqBody = decodedReq.body;
    if (decodedReq.type === "query" && reqBody.id !== "") {
        if (reqBody.id === undefined)
            sendResponse.JSON(res, "Invalid params", httpStatus.BAD_REQUEST)
        else {
            let problems = await getById(reqBody.id);

            if (reqBody.type === "run" && reqBody.query !== "") {
                const problemQuery = (await problemsServices.getProblemQuery(reqBody.id)).data
                const querryResponse = await problemsServices.runQueryToString(reqBody.query)
                const problemResponse = await problemsServices.runQueryToString(problemQuery)
                if (!querryResponse.error)
                    sendResponse.JSON(
                        res,
                        {
                            expected: problemResponse,
                            got: querryResponse.result,
                        },
                        200
                    );
                else
                    sendResponse.JSON(res, querryResponse.result, statusCodes.INVALID_SQL_STATEMENT);
            }
            else if (reqBody.type === "submit" && reqBody.query !== "" && reqBody.uid !== "") {
                const solutionResult = await problemsServices.compareSolution(reqBody.query, reqBody.id);
                problemsServices.logProblem(reqBody.id, reqBody.uid, reqBody.query, solutionResult.result)
                sendResponse.JSON(res, solutionResult, 200);
            }
            else {
                if (reqBody.data === "true")
                    problems = await getProblemDataById(reqBody.id);
                else
                    problems = await getById(reqBody.id);

                if (problems.found)
                    sendResponse.customJSON(res, problems.data, 200);
                else
                    sendResponse.JSON(res, "Problem not found", statusCodes.INEXISTENT_PROBLEM)
            }

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
async function getProblemDataById(id) {
    const problems = await problemsServices.getProblemDataById(id);
    return problems
}

// NOT Working

async function canRate(req, res) {
    const decodedReq = await getReqBody(req);
    const reqBody = decodedReq.body;
    console.log(reqBody.uid, reqBody.pid)
    if (decodedReq.type === "json") {
        if (reqBody.uid === undefined || reqBody.pid === undefined) {
            sendResponse.JSON(res, "Invalid fields", statusCodes.INVALID_JSON_FORMAT)
        }
        else {
            if (await problemsServices.canBeRatedBy(reqBody.uid)) {
                sendResponse.JSON(res, "Can rate", 200);
            }
            else {
                sendResponse.JSON(res, "Can't rate", statusCodes.UNABLE_TO_RATE);
            }
        }
    }
}

module.exports = {
    get: get,
    canRate: canRate
}