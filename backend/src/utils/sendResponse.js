/**
 * A utility class for sending HTTP responses.
 */
class sendResponse {
	/**
	 * Sends a JSON response with the specified message and HTTP status code.
	 *
	 * @param {http.ServerResponse} res - The HTTP response object.
	 * @param {string} message - The message to include in the response body.
	 * @param {number} resCode - The HTTP status code to set in the response.
	 * @returns {Promise<void>} A Promise that resolves when the response has
	 * been sent.
	 */
	async JSON(res, message, resCode) {
		const responseObject = {
			message: message,
		};
		res.writeHead(resCode, { "Content-Type": "application/json" });
		res.end(JSON.stringify(responseObject));
	}
	/**
	 * Sends a JSON response with the specified message and HTTP status code.
	 *
	 * @param {http.ServerResponse} res - The HTTP response object.
	 * @param {JSON} json - The json to include in the response body.
	 * @param {number} resCode - The HTTP status code to set in the response.
	 * @returns {Promise<void>} A Promise that resolves when the response has
	 * been sent.
	 */
	async customJSON(res, json, resCode) {
		const responseObject = json;
		res.writeHead(resCode, { "Content-Type": "application/json" });
		res.end(JSON.stringify(responseObject));
	}

	async cookie(res, cookies, resCode) {
		res.setHeader("Set-Cookie", cookies);
		res.writeHead(resCode);
		res.end();
	}

}

module.exports = new sendResponse();
