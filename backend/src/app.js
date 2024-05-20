const testRoute = require("./routes/testRoute")
const singUpRoute = require("./routes/signUpRoute")
const urlRoot = require("./utils/urlRoot")
const resourceNotFound = require("./utils/resourceNotFound")


const routes = {
    '/': testRoot,      // testeaza /
    '/test': testRoute,  // testeaza /test
    '/signUp': singUpRoute
};

async function app(req, res) {
    const url = req.url.split('?')[0];
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
        data: "Home Test. May be modified if necesarry"
    };
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(responseObject));
}

module.exports = app;