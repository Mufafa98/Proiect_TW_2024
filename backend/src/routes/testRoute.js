const diveIntoUrl = require("../utils/urlDiver")
const urlRoot = require("../utils/urlRoot")
const resourceNotFound = require("../utils/resourceNotFound")

const routes = {
    'GET /': (req, res) => {
        const responseObject = { data: "/Test -> Will be removed" };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(responseObject));
    },
    'GET /asd': (req, res) => {
        const responseObject = { data: "/Test -> Will be removed asd" };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(responseObject));
    },
};

async function handleRequest(req, res) {
    const method = req.method;
    const currentUrl = await diveIntoUrl(req.url.split('?')[0]);
    const url = await urlRoot(currentUrl);

    const routeKey = `${method} ${url}`;
    const routeHandler = routes[routeKey];

    if (routeHandler) {
        routeHandler(req, res);
    } else {
        resourceNotFound(req, res);
    }
}

module.exports = handleRequest;
