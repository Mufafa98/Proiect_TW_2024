const database = require("./databaseServices");
const userDatabase = require("./userDatabaseServices");

class Problems {
	/**
	 * Returns all the problems in the database
	 * @returns {found: Boolean, data: *} Where data is an array of problems
	 */
	async getAll() {
		const problems = await database.query("select * from Problems");
		return {
			found: problems.length !== 0,
			data: problems,
		};
	}
	/**
	 * Returns the problems with a specific id
	 * @param {Number} id The id to retrieve by
	 * @returns {found: Boolean, data: *} Where data is an array of problems
	 */
	async getById(id) {
		const problems = await database.query(
			`select * from Problems where id like ${id}`,
		);
		return {
			found: problems.length !== 0,
			data: problems,
		};
	}
	/**
	 * Returns the problems data with a specific id
	 * @param {Number} id The id to retrieve by
	 * @returns {found: Boolean, data: *} Where data is an array of problems data
	 */
	async getProblemDataById(id) {
		const problems = await database.query(
			`select pd.id, pd.content, p.Title from ProblemData pd join Problems p on pd.id = p.id where pd.id = ${id}`,
		);
		return {
			found: problems.length !== 0,
			data: problems,
		};
	}

	async getProblemByTitle(title) {
		const problems = await database.query(
			`select * from Problems where title like '${title}'`,
		);
		return {
			found: problems.length !== 0,
			data: problems,
		};
	}

	/**
	 * Method to retrieve the solution query to a problem
	 * @param {Numebr} id The id of the problem for which the query is needed
	 * @returns {found: Boolean, data: *} Where data stores the query
	 */
	async getProblemQuery(id) {
		const problems = await database.query(
			`select solution from ProblemData where id = ${id}`,
		);
		return {
			found: problems.length !== 0,
			data: problems[0].solution,
		};
	}
	/**
	 * Method to get a formated query result
	 * @param {String} query
	 * @returns {error: Boolean, result: String} Where error is the state of the
	 * sql statement and the result is a formated string with the result of the query
	 */
	async runQueryToString(query) {
		try {
			const queryResult = await userDatabase.queryToString(query);
			return {
				error: false,
				result: queryResult,
			};
		} catch (error) {
			return {
				error: true,
				result: error.sqlMessage,
			};
		}
	}
	/**
	 * Method to check if a querry is correct for a problem
	 * @param {String} query query for the problem
	 * @param {Number} id problem id
	 * @returns {error: Boolean, result: Boolean} Where the correctness is stored
	 * in result
	 */
	async compareSolution(query, id) {
		try {
			const problemQuerry = (await this.getProblemQuery(id)).data;
			database.query("USE UserDatabase");
			const queryResult = await database.query(query);
			const solution = await database.query(problemQuerry);
			database.query("USE Dev");
			const sameResults =
				JSON.stringify(queryResult) === JSON.stringify(solution);
			return {
				error: false,
				result: sameResults,
			};
		} catch (error) {
			database.query("USE Dev");
			return {
				error: true,
				result: error.sqlMessage,
			};
		}
	}
	/**
	 * Method to log all submited queryes
	 * @param {Number} problemId
	 * @param {Number} userId
	 * @param {String} query
	 * @param {Boolean} passed
	 * @returns {error: Boolean, result: String}
	 */
	async logProblem(problemId, userId, query, passed) {
		try {
			database.query("USE Dev");
			let insertQuery = "insert into ProblemsSolved (userId, problemId, ";
			insertQuery += "passed, query, solvedAt) values (";
			insertQuery += `${userId},${problemId},${passed},'${query}',NOW())`;
			database.insert(insertQuery);
			return {
				error: false,
				result: "Success",
			};
		} catch (error) {
			database.query("USE Dev");
			return {
				error: true,
				result: "Internal server error",
			};
		}
	}
	/**
	 * Method to check wether an user can rate a problem
	 * @param {Number} uid user id
	 * @param {Number} pid problem id
	 * @returns {found: Boolean, data: *} Where found represents wether a user can
	 * rate a problem or not
	 */
	async canBeRatedBy(uid, pid) {
		const response = await database.query(
			`select * from Raitings where uid = ${uid} and problemid = ${pid}`,
		);
		return {
			found: response.length === 0,
			data: response,
		};
	}
	/**
	 * Method to insert a raiting to a problem
	 * @param {Number} uid user id
	 * @param {Number} pid problem id
	 * @param {String} raiting the raiting of the problem
	 * @returns {success: Boolean, message :?String} the rating was succesfully
	 * inserted or there appeared an error message
	 */
	async rate(uid, pid, raiting) {
		try {
			database.insert(
				`insert into Raitings (uid, problemid, raiting) values (${uid}, ${pid}, '${raiting}')`,
			);
			return {
				success: true,
			};
		} catch (error) {
			return {
				success: false,
				message: error.message,
			};
		}
	}

	async insertProblem(title, chapter, difficulty) {
        let querry = "insert into Problems (TITLE, CHAPTER, DIFFICULTY)";
        querry += ` values('${title}', '${chapter}', '${difficulty}')`;
        database.insert(querry);
        try{
            let querry = "insert into Problems (TITLE, CHAPTER, DIFFICULTY)";
            querry += ` values('${title}', '${chapter}', '${difficulty}')`;
            database.insert(querry);
        } catch (error) {
            database.query("USE Dev")
            return {
                error: true,
                result: error.sqlMessage
            };
        }
    }

	async insertSolution(title, content, solution) {
        try{
            const result = await database.query(`SELECT * FROM Problems WHERE Title='${title}'`);
            const idValue = result[0].id;
            let querry = "insert into ProblemData (ID, CONTENT, SOLUTION)";
            querry += ` values('${idValue}', '${content}', '${solution}')`;
            database.insert(querry);
        } catch (error) {
            database.query("USE Dev")
            return {
                error: true,
                result: error.sqlMessage
            };
        }
        
    }
}

module.exports = new Problems();
