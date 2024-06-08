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

    async getProblemByTitle(title){
        const problems = await
            database.query(`select * from Problems where title like '${title}'`)
        return {
            found: problems.length !== 0,
            data: problems
        }
    }

    async getProblemQuery(id) {
        const problems = await
            database.query(`select solution from ProblemData where id = ${id}`);
        return {
            found: problems.length !== 0,
            data: problems[0].solution
        }
    }
    async runQueryToString(query) {
        try {
            database.query("USE UserDatabase")
            const queryResult = await database.queryToString(query);
            database.query("USE Dev")
            return {
                error: false,
                result: queryResult
            };
        } catch (error) {
            database.query("USE Dev")
            return {
                error: true,
                result: error.sqlMessage
            };
        }
    }
    async compareSolution(query, id) {
        try {
            const problemQuerry = (await this.getProblemQuery(id)).data;
            database.query("USE UserDatabase")
            const queryResult = await database.query(query);
            const solution = await database.query(problemQuerry);
            database.query("USE Dev")
            const sameResults = JSON.stringify(queryResult) === JSON.stringify(solution)
            return {
                error: false,
                result: sameResults
            };
        } catch (error) {
            database.query("USE Dev")
            return {
                error: true,
                result: error.sqlMessage
            };
        }
    }
    async logProblem(problemId, userId, query, passed) {
        try {
            database.query("USE Dev")
            let insertQuery = "insert into ProblemsSolved (userId, problemId, ";
            insertQuery += "passed, query, solvedAt) values (";
            insertQuery += `${userId},${problemId},${passed},'${query}',NOW())`
            database.insert(insertQuery);
            return {
                error: false,
                result: "Success"
            };
        } catch (error) {
            database.query("USE Dev")
            return {
                error: true,
                result: "Internal server error"
            };
        }
    }
    async canBeRatedBy(uid) {
        const response = await
            database.query(`select COUNT(*) from Raitings where uid = ${uid}`);
        return {
            found: problems.length !== 0,
            data: response
        }
    }

    async insertProblem(title, chapter, difficulty) {
        let querry = "insert into Problems (TITLE, CHAPTER, DIFFICULTY)";
        querry += ` values('${title}', '${chapter}', '${difficulty}')`;
        database.insert(querry);
    }

    async insertSolution(title, solution) {
        const result = await database.query(`SELECT * FROM Problems WHERE Title='${title}'`);
        const idValue = result[0].id;
        let querry = "insert into ProblemData (ID, CONTENT, SOLUTION)";
        querry += ` values('${idValue}', '${title}', '${solution}')`;
        database.insert(querry);
    }
}

module.exports = new Problems();