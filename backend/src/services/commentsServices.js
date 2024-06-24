const database = require("./databaseServices");
const userDatabase = require("./userDatabaseServices");

class CommentsServices {
    async comment(uid, pid, message) {
        try {
            const now = new Date();
            const year = now.getFullYear();
            const month = (`0${now.getMonth() + 1}`).slice(-2);  // Months are zero-indexed, so we add 1
            const day = (`0${now.getDate()}`).slice(-2);
            const hours = (`0${now.getHours()}`).slice(-2);
            const minutes = (`0${now.getMinutes()}`).slice(-2);
            const seconds = (`0${now.getSeconds()}`).slice(-2);

            const datetimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

            let querry = "insert into Comments (pid, uid, message, posted_on)";
            querry += ` values('${pid}', '${uid}', '${message}', STR_TO_DATE('${datetimeString}', '%Y-%m-%d %H:%i:%s'))`;
            database.insert(querry);
        } catch (error) {
            console.error(error);
        }
    }

    async getByPid(pid) {
        try {
            const querry = `select Username, message, posted_on from Comments join Users on Comments.uid = Users.ID where pid = ${pid}`;
            const comments = await database.query(querry);
            return {
                found: comments.length !== 0,
                data: comments
            }
        } catch (error) {
            console.error(error);
            return {
                found: false,
                data: [0]
            }
        }
    }
}

module.exports = new CommentsServices();