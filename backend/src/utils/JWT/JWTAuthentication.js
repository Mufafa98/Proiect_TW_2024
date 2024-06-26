const jwt = require('jsonwebtoken');
const jwtKey = require('./JWTSecretGeneration');
const httpStatus = require("http-status-codes").StatusCodes;

function authenticateToken(token) {
    let response;
    if (!token)
        response = httpStatus.UNAUTHORIZED;

    jwt.verify(token, jwtKey, (err) => {
        if (err) {
            //console.log("Invalid signature");
            response = httpStatus.FORBIDDEN;
        }
        else
            response = httpStatus.OK;
    });
    return response;
}

module.exports = authenticateToken;