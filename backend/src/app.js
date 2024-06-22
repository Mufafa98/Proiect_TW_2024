const singUpRoute = require("./routes/signUpRoute");
const loginRoute = require("./routes/loginRoute");
const problemsRoute = require("./routes/problemsRoute");
const urlRoot = require("./utils/urlRoot");
const resourceNotFound = require("./utils/resourceNotFound");
const protectedController = require("./controllers/protectedController");
const metadataRoutes = require("./routes/metadataRoute");
const commentsRoute = require("./routes/commentsRoute");

const routes = {
	"/": testRoot,
	"/signUp": singUpRoute,
	"/login": loginRoute,
	"/problems": problemsRoute,
	"/protected": protectedController,
	"/metadata": metadataRoutes,
	"/comments": commentsRoute,
};

async function app(req, res) {
	const url = req.url.split("?")[0];
	const routeKey = await urlRoot(url);
	const routeHandler = routes[routeKey];

	if (routeHandler) {
		routeHandler(req, res);
	} else {
		resourceNotFound(req, res);
	}
}

async function testRoot(req, res) {
	const responseObject = {
		data: "Home Test. May be modified if necesarry",
	};
	res.writeHead(200, {
		"Content-Type": "application/json",
	});
	res.end(JSON.stringify(responseObject));
}

module.exports = app;
