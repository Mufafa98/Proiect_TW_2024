const diveIntoUrl = require("../utils/urlDiver");
const urlRoot = require("../utils/urlRoot");
const resourceNotFound = require("../utils/resourceNotFound");
const leaderboardController = require("../controllers/leaderboardController");

const routes = {
    'GET /': leaderboardController.get,
};

async function handleProblems(req, res) {
    const method = req.method;
    const currentUrl = await diveIntoUrl(req.url.split("?")[0]);
    const url = await urlRoot(currentUrl);

    const routeKey = `${method} ${url}`;
    const routeHandler = routes[routeKey];
    if (routeHandler) {
        routeHandler(req, res);
    } else {
        resourceNotFound(req, res);
    }
}

module.exports = handleProblems;
