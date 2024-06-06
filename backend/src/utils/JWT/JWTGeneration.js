const jwt = require('jsonwebtoken');
const secretKey = require("./JWTSecretGeneration")

function generateAccessToken(userData) {
    return jwt.sign(
        {
            userData: userData,
            timestamp: Date.now()
        },
        secretKey
    );
}

module.exports = {
    generateAccessToken,
} 