const mysql = require("mysql2");

class Database {
    constructor() {
        if (!Database.instance) {
            Database.instance = this;
            this.connection = null;
            this.connection = mysql.createConnection(process.env.DATABASE_URL);
        }
    }

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

const instance = new Database();

module.exports = instance;
