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

	async getAllUsernames(){
        try{
			const usernames = await database.query(`SELECT USERNAME FROM Users`);
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
}

module.exports = new UserServices();
