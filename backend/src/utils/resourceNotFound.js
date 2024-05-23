
/**
 * Function to send a Not Found status code to the client
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
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