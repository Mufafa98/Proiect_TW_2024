const database = require("./databaseServices");
const userDatabase = require("./userDatabaseServices");

class Problems {
	/**
	 * Returns all the problems in the database
	 * @returns {found: Boolean, data: *} Where data is an array of problems
	 */
	async getAll() {
		const problems = await
			database.query("select * from Problems");
		return {
			found: problems.length !== 0,
			data: problems
		}
	}
	/**
	 * Returns the problems with a specific id
	 * @param {Number} id The id to retrieve by
	 * @returns {found: Boolean, data: *} Where data is an array of problems
	 */
	async getById(id) {
		try {
			const problems = await
				database.query(`select * from Problems where id like ${id}`);
			return {
				found: problems.length !== 0,
				data: problems
			}
		} catch (error) {
			return {
				found: false,
				data: null
			}
		}

	}
	/**
 * Returns the problems with a specific title
 * @param {String} title The title to retrieve by
 * @returns {found: Boolean, data: *} Where data is an array of problems
 */
	async getByTitle(title) {
		try {
			const problems = await
				database.query(`select * from Problems where title like '%${title}%'`);
			return {
				found: problems.length !== 0,
				data: problems
			}
		} catch (error) {
			return {
				found: false,
				data: null
			}
		}

	}
	/**
* Returns the problems with a specific chapter
* @param {String} chapter The chapter to retrieve by
* @returns {found: Boolean, data: *} Where data is an array of problems
*/
	async getByChapter(chapter) {
		try {
			const problems = await
				database.query(`select * from Problems where chapter like '%${chapter}%'`);
			return {
				found: problems.length !== 0,
				data: problems
			}
		} catch (error) {
			return {
				found: false,
				data: null
			}
		}
	}
	/**
* Returns the problems with a specific difficulty
* @param {String} difficulty The chapter to retrieve by
* @returns {found: Boolean, data: *} Where data is an array of problems
*/
	async getByDifficulty(difficulty) {
		try {
			const problems = await
				database.query(`select * from Problems where difficulty like '%${difficulty}%'`);
			return {
				found: problems.length !== 0,
				data: problems
			}
		} catch (error) {
			return {
				found: false,
				data: null
			}
		}
	}
	/**
	 * Returns the problems data with a specific id
	 * @param {Number} id The id to retrieve by
	 * @returns {found: Boolean, data: *} Where data is an array of problems data
	 */
	async getProblemDataById(id) {
		const problems = await
			database.query(`select pd.id, pd.content, p.Title from ProblemData pd join Problems p on pd.id = p.id where pd.id = ${id}`);
		return {
			found: problems.length !== 0,
			data: problems
		}
	}
	/**
	 * Method to retrieve the solution query to a problem
	 * @param {Numebr} id The id of the problem for which the query is needed
	 * @returns {found: Boolean, data: *} Where data stores the query
	 */
	async getProblemQuery(id) {
		const problems = await
			database.query(`select solution from ProblemData where id = ${id}`);
		return {
			found: problems.length !== 0,
			data: problems[0].solution
		}
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
				result: queryResult
			};
		} catch (error) {
			return {
				error: true,
				result: error.sqlMessage
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

	async insertSolution(title, content, solution) {
		try {
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
