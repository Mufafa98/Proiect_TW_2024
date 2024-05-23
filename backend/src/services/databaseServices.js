const mysql = require("mysql2");
/**
 * Database class for managing MySQL connections and queries.
 */
class Database {
    constructor() {
        if (!Database.instance) {
            Database.instance = this;
            this.connection = null;
            this.connection = mysql.createConnection(process.env.DATABASE_URL);
        }
    }
    /**
     * Executes a SQL query.
     * 
     * @param {string} query - The SQL query string.
     * @returns {Promise<Object>} - A promise that resolves with the query results or rejects with an error.
     */
    async query(querry) {
        return new Promise((resolve, reject) => {
            this.connection.query(querry, (error, results) => {
                if (error) {
                    reject(error);
                    console.error(error.message);
                    return
                }
                resolve(results);
            });
        })
    }
    /**
     * Executes a SQL insert query.
     * 
     * @param {string} query - The SQL insert query string.
     * @returns {Promise<Object>} - A promise that resolves with the insert results or rejects with an error.
     */
    async insert(query) {
        return new Promise((resolve, reject) => {
            this.connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }
}
// Create a singleton instance of the Database class
const instance = new Database();

module.exports = instance;
