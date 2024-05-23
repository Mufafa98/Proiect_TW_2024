

class Validators {
    /**
     * Function to validate email
     * @param {email} email Email to check
     * @returns {boolean} True if the email is valid, False otherwise
     */
    async email(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

module.exports = new Validators();