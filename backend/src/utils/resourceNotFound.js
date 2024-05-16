

async function resourceNotFound(req, res) {
    res.writeHead(404, {
        'Content-Type': 'application/json'
    });
    const responseObject = {
        message: "Not Found",
        status: "error"
    };
    res.end(JSON.stringify(responseObject));
}

module.exports = resourceNotFound