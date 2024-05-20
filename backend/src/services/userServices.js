const database = require("./databaseServices")

class UserServices {
    async getUserByEmail(email) {
        const user = await database.query(`select * from Users where email like '${email}'`);
        return {
            found: user.length !== 0,
            data: user
        }
    }
    async insertUser(username, email, password) {
        let querry = "insert into Users (USERNAME, EMAIL, PASSWORD)";
        querry += ` values('${username}', '${email}', '${password}')`;
        database.insert(querry);
    }
}

module.exports = new UserServices();