const database = require("./databaseServices");

class UserServices {
	/**
	 * Retrives an user by email
	 * @param {string} email
	 * @returns {Promise<{found: bolean, data: *}>} A promise that contains a field
	 * to test wether the user was found and a data field that will be populated with
	 * the user's data
	 */
	async getUserByEmail(email) {
		const user = await database.query(
			`select * from Users where email like '${email}'`,
		);
		return {
			found: user.length !== 0,
			data: user[0],
		};
	}
	/**
	 * Retrives an user by username
	 * @param {string} username
	 * @returns {Promise<{found: bolean, data: *}>} A promise that contains a field
	 * to test wether the user was found and a data field that will be populated with
	 * the user's data
	 */
	async getUserByUsername(username) {
		const user = await database.query(
			`select * from Users where username like '${username}'`,
		);
		return {
			found: user.length !== 0,
			data: user[0],
		};
	}
	/**
	 * Method to get the top tournament users
	 * @param {String} category 
	 * @param {String} difficulty 
	 * @returns {error: Boolean, result: String} Where error is the state of the
	 * sql statement and the result is a formated string with the result of the query
	 */
	async getTopUsers(category, difficulty) {
		try {
			const user = await database.query(`select userId, Username, count(passed) as "totalProblemsSolved", sum(passed) / count(passed) as "SuccessRate"
from ProblemsSolved join Users on ProblemsSolved.userId = Users.ID
where training = 0
  and solvingDifficulty like '${difficulty}'
  and solvingCategory like '${category}'
group by userId`);
			return {
				found: user.length !== 0,
				data: user,
			};
		} catch (error) {
			return {
				found: false,
				data: 0,
			};
		}
	}
	async user20ProblemRestriction(id) {
		try {
			const user = await database.query(`select count(distinct ProblemsSolved.id) - 20 * count(distinct ProblemsByUser.id) < 20 as "data" from ProblemsSolved left join ProblemsByUser on ProblemsSolved.userId = ProblemsByUser.uid where userId = ${id} and training = 0`);
			console.log(user);
			return user[0].data;
		} catch (error) {
			return false;
		}
	}
	async isUserAdmin(id) {
		try {
			const user = await database.query(`select admin from Users where ID = ${id}`);
			return user[0].admin;
		} catch (error) {
			return false;
		}
	}
	/**
	 * Method to get the top tournament users by id
	 * @param {String} category 
	 * @param {String} difficulty 
	 * @returns {error: Boolean, result: String} Where error is the state of the
	 * sql statement and the result is a formated string with the result of the query
	 */
	async getTopUsersById(category, difficulty, id) {
		try {
			const user = await database.query(`select userId, Username, count(passed) as "totalProblemsSolved", sum(passed) / count(passed) as "SuccessRate"
from ProblemsSolved join Users on ProblemsSolved.userId = Users.ID
where training = 0
  and solvingDifficulty like '${difficulty}'
  and solvingCategory like '${category}'
  and userId = ${id}
group by userId`);
			return {
				found: user.length !== 0,
				data: user,
			};
		} catch (error) {
			return {
				found: false,
				data: 0,
			};
		}
	}
	/**
	 * Method to get the top tournament users by username
	 * @param {String} category 
	 * @param {String} difficulty 
	 * @returns {error: Boolean, result: String} Where error is the state of the
	 * sql statement and the result is a formated string with the result of the query
	 */
	async getTopUsersByUsername(category, difficulty, username) {
		try {
			const user = await database.query(`select userId, Username, count(passed) as "totalProblemsSolved", sum(passed) / count(passed) as "SuccessRate"
from ProblemsSolved join Users on ProblemsSolved.userId = Users.ID
where training = 0
  and solvingDifficulty like '${difficulty}'
  and solvingCategory like '${category}'
  and Username like '%${username}%'
group by userId`);
			return {
				found: user.length !== 0,
				data: user,
			};
		} catch (error) {
			return {
				found: false,
				data: 0,
			};
		}

	}
	/**
	 * Retrives an user by id
	 * @param {string} id
	 * @returns {Promise<{found: bolean, data: *}>} A promise that contains a field
	 * to test wether the user was found and a data field that will be populated with
	 * the user's data
	 */
	async getUserById(id) {
		const user = await database.query(`select * from Users where id = '${id}'`);
		return {
			found: user.length !== 0,
			data: user[0],
		};
	}
	/**
	 * Inserts an user in the database
	 * @param {string} username
	 * @param {string} email
	 * @param {string} password
	 */
	async insertUser(username, email, password) {
		let querry = "insert into Users (USERNAME, EMAIL, PASSWORD)";
		querry += ` values('${username}', '${email}', '${password}')`;
		database.insert(querry);
	}

	async getAllUsernames() {
		try {
			const usernames = await database.query(`SELECT CASE WHEN LENGTH(USERNAME) > 10 THEN CONCAT(LEFT(USERNAME, 10),'...') ELSE USERNAME END USERNAME FROM Users`);
			return {
				found: usernames.length !== 0,
				data: usernames,
			}
		} catch (error) {
			database.query("USE Dev")
			return {
				error: true,
				result: error.sqlMessage
			}
		}
	}

	async getUserDataByUsername(username) {
		const user = await database.query(
			`SELECT ID, USERNAME, EMAIL, ADMIN FROM Users WHERE USERNAME = '${username}';`,
		);
		return {
			found: user.length !== 0,
			data: user[0],
		};
	}
}

module.exports = new UserServices();