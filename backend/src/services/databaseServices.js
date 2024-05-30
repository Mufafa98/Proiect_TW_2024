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
                    return
                }
                resolve(results);
            });
        })
    }

    async queryToString(query) {
        return new Promise((resolve, reject) => {
            this.connection.query(query, (error, results, fields) => {
                if (error) { reject(error); return; }
                let output = "";
                const columnNames = fields.map(field => field.name);
                const maxChars = [];
                for (let i = 0; i < columnNames.length; i++) {
                    const element = columnNames[i];
                    maxChars[i] = element.length;
                }
                for (let i = 0; i < results.length; i++) {
                    const line = results[i];
                    const cols = columnNames.map(column => line[column]);
                    for (let j = 0; j < cols.length; j++) {
                        let element = String(cols[j]);
                        if (typeof (cols[j]) === "object")
                            element = element.substring(0, 15)
                        if (element.length > maxChars[j])
                            maxChars[j] = element.length;
                    }
                }

                for (let i = 0; i < columnNames.length; i++) {
                    const name = columnNames[i].padEnd(maxChars[i] + 5, " ");
                    output += name;
                }
                output += "\n"
                for (let i = 0; i < results.length; i++) {
                    const line = results[i];
                    const cols = columnNames.map(column => line[column]);
                    for (let j = 0; j < cols.length; j++) {
                        let element = String(cols[j]).padEnd(maxChars[j] + 5, " ");
                        if (typeof (cols[j]) === "object")
                            element = element.substring(0, 15).padEnd(maxChars[j] + 5, " ")
                        output += element;
                    }
                    output += "\n"
                }
                resolve(output)
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
