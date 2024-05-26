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
    async getProblemDataById(id) {
        const problems = await
            database.query(`select pd.id, pd.content, p.Title from ProblemData pd join Problems p on pd.id = p.id where pd.id = ${id}`);
        return {
            found: problems.length !== 0,
            data: problems
        }
    }
}

module.exports = new Problems();