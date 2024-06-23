const diveIntoUrl = require("../utils/urlDiver");
const urlRoot = require("../utils/urlRoot");
const resourceNotFound = require("../utils/resourceNotFound");
const problems = require("../controllers/problemsController");

const routes = {
	"GET /": problems.get,
	"GET /rate": problems.canRate,
	"GET /reported": problems.getReportedProblems,
	"POST /": problems.post,
	"POST /rate": problems.rate,
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
