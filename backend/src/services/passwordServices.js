const bcrypt = require("bcrypt")

class PasswordServices {
    /**
     * Hashes a plain text password.
     * 
     * @param {string} password - The plain text password to hash.
     * @returns {Promise<string>} - A promise that resolves with the hashed password.
     */
    async hash(password) {
        return bcrypt.hash(password, 10);
    }
    /**
     * Compares a plain text password with a hashed password.
     * 
     * @param {string} password - The plain text password.
     * @param {string} hash - The hashed password.
     * @returns {Promise<boolean>} - A promise that resolves with a boolean indicating if the passwords match.
     */
    async compare(password, hash) {
        return bcrypt.compare(password, hash);
    }
}

module.exports = new PasswordServices();