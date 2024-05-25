/**
 * Retrieves the body of a request and determines its type based on the 
 * content-type header.
 *
 * @param {http.IncomingMessage} req - The incoming request object.
 * @returns {Promise<{body: *, type: string}>} 
 * A promise that resolves with an object containing the body and type of the 
 * request.
 * 
 * Current implemented types are: "json", "params"
 */
async function getBody(req) {
    return new Promise((resolve, reject) => {
        const result = {
            body: "",
            type: ""
        };

        req.on("data", chunk => {
            result.body += chunk.toString();
        });

        req.on("end", () => {
            if (req.headers["content-type"] === "application/json") {
                result.body = JSON.parse(result.body);
                result.type = "json";
            } else if (req.headers["content-type"] === "application/x-www-form-urlencoded") {
                result.body = new URLSearchParams(result.body);
                result.type = "params";
            }
            resolve(result);
        });

        req.on("error", (err) => {
            reject(err);
        });
    });
}

module.exports = getBody;
