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
	 * Returns a candidate for a tournament problem
	 * @returns {found: Boolean, data: *} Where data is an id of a candidate
	 */
	async getTournamentProblem(chapter, difficulty) {
		const problems = await
			database.query(`select Problems.id, COUNT(userId) as 'solves'
		from Problems left join ProblemsSolved 
		on Problems.id = ProblemsSolved.problemId
		where Problems.Chapter like '${chapter}'
		and Problems.Difficulty like '${difficulty}'
		group by Problems.id
		order by solves
		LIMIT 1`);
		return {
			found: problems.length !== 0,
			data: problems
		}
	}
	/**
 * Returns the available chapters
 * @returns {found: Boolean, data: *} Where data is an array of chapters
 */
	async getChapters() {
		try {
			const problems = await
				database.query("select distinct Chapter from Problems");
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
 * Returns the available chapters in tournaments
 * @returns {found: Boolean, data: *} Where data is an array of chapters
 */
	async getTournamentChapters() {
		try {
			const problems = await
				database.query("select distinct solvingCategory from ProblemsSolved where training = 0");
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
 * Returns the available difficulties in tournaments
 * @returns {found: Boolean, data: *} Where data is an array of chapters
 */
	async getTournamentDifficulty() {
		try {
			const problems = await
				database.query("select distinct solvingDifficulty from ProblemsSolved where training = 0");
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
	/**
		 * Method to log all submited queryes
		 * @param {Number} problemId 
		 * @param {Number} userId 
		 * @param {String} query 
		 * @param {Boolean} passed 
		 * @returns {error: Boolean, result: String}
		 */
	async logProblem(problemId, userId, query, passed, notTournament = 1, chapter = "", difficulty = "") {
		try {

			database.query("USE Dev")
			let insertQuery = "insert into ProblemsSolved (userId, problemId, ";
			insertQuery += "passed, query, solvedAt, training, solvingCategory, solvingDifficulty) values (";
			insertQuery += `${userId},${problemId},${passed},'${query}',NOW(),${notTournament}, '${difficulty}', '${chapter}')`
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
	/**
	 * Method to check wether an user can rate a problem
	 * @param {Number} uid user id
	 * @param {Number} pid problem id
	 * @returns {found: Boolean, data: *} Where found represents wether a user can
	 * rate a problem or not
	 */
	async canBeRatedBy(uid, pid) {
		const response = await
			database.query(`select * from Raitings where uid = ${uid} and problemid = ${pid}`);
		return {
			found: response.length === 0,
			data: response
		}
	}
	async insertByUser(uid, title, chapter, statement, solution, difficulty) {
		const query = `insert into ProblemsByUser (uid, Title, Chapter, Statement, Solution, Difficulty) values (${uid}, '${title}', '${chapter}', '${statement}', '${solution}', '${difficulty}')`
		// console.log(query);
		database.insert(query);
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
			database.insert(`insert into Raitings (uid, problemid, raiting) values (${uid}, ${pid}, '${raiting}')`)
			return {
				success: true,
			}
		}
		catch (error) {
			return {
				success: false,
				message: error.message
			}
		}
	}
	async insertProblem(title, chapter, difficulty) {
		try {
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

	// async insertSolution(title, content, solution) {
	//     try{
	//         const result = await database.query(`SELECT * FROM Problems WHERE Title='${title}'`);
	//         const idValue = result[0].id;
	//         let querry = "insert into ProblemData (ID, CONTENT, SOLUTION)";
	//         querry += ` values('${idValue}', '${content}', '${solution}')`;
	//         database.insert(querry);
	//     } catch (error) {
	//         database.query("USE Dev")
	//         return {
	//             error: true,
	//             result: error.sqlMessage
	//         };
	//     }
	// }
	async getProblemByTitle(title) {
		const problems = await database.query(
			`select * from Problems where title like '${title}'`
		);
		return {
			found: problems.length !== 0,
			data: problems,
		};
	}

	async getAllProblemByTitle(title) {
		const problems = await database.query(
			`SELECT p.id, p.Title, p.Chapter, p.Difficulty, pd.content, pd.solution FROM Problems p  JOIN ProblemData pd where p.id = pd.id and p.Title = '${title}';`
		);
		return {
			found: problems.length !== 0,
			data: problems,
		};
	}

	async getReportedProblems() {
		try {
			const problems = await database.query(`SELECT P.Title FROM Problems P JOIN Raitings R WHERE R.raiting = 'Wrong' AND P.id = R.problemid`);
			return {
				found: problems.length !== 0,
				data: problems,
			}
		} catch (error) {
			database.query("USE Dev")
			return {
				error: true,
				result: error.sqlMessage
			}
		}
	}
}

module.exports = new Problems();
