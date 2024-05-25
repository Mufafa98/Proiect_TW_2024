const database = require("./databaseServices");

class Problems {
    async getAll() {
        const problems = await
            database.query("select * from Problems");
        return {
            found: problems.length !== 0,
            data: problems
        }
    }
    async getById(id) {
        const problems = await
            database.query(`select * from Problems where id like ${id}`);
        return {
            found: problems.length !== 0,
            data: problems
        }
    }
}

module.exports = new Problems();