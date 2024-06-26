const diveIntoUrl = require("../utils/urlDiver")
const urlRoot = require("../utils/urlRoot")
const resourceNotFound = require("../utils/resourceNotFound")
const user = require("../controllers/loginController")

const routes = {
    'GET /': (req, res) => {
        // console.log("recived get on /login");
        const responseObject = { data: "Login GET request" };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(responseObject));
    },
    'POST /': user.loginUser,
    'GET /users': user.getAllUsers,
    'POST /userByUname': user.getUserDataByUsername,
};

async function handleLogin(req, res) {
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

module.exports = handleLogin;
