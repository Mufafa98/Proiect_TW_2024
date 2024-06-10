const jwt = require('jsonwebtoken');

async function decode(token) {
    return jwt.decode(token);
}

module.exports = decode;