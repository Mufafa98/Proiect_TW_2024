const crypto = require('node:crypto');

function generateSecretKey(length) {
    return crypto
        .randomBytes(Math.ceil(length / 2))
        .toString("hex")
        .slice(0, length);
}

const jwtKey = generateSecretKey(32);

module.exports = jwtKey;
