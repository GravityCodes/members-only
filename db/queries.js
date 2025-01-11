const pool = require("./pool");

class User {
    async insertUser(params) {
        const query = `
        INSERT INTO users (firstname, lastname, username, password, member_status)
        VALUES($1,$2,$3,$4,$5);
        `
        await pool.query(query, [params.firstname, params.lastname, params.username, params.password, false]);
    }
    async getUser(user){
        const query = `
        SELECT * FROM users WHERE username = $1;
        `
        const {rows} = await pool.query(query, [user]);
        const username = rows[0];
        return username;
    }

    async becomeMember(id){
        try {
        const query=`
            UPDATE users
            SET member_status = true
            WHERE id = $1;
        `
        await pool.query(query, [id]);
        }
        catch(err){
            throw err;
        }
    }
}

class Messages {
    async getAllMessages(){
        const query = `
            SELECT m.message, m.date_added,  u.username AS author_name
            FROM messages AS m
            LEFT JOIN users AS u
            ON m.author_id = u.id;
        `
        const {rows} = await pool.query(query);
        const messages = rows;

        return messages;
    }

    async insertMessage(params){
        const query = `
            INSERT INTO messages(author_id, message, date_added)
            VALUES($1, $2, $3);
        `
        await pool.query(query, [params.author_id, params.message, params.date_added]);
    }
}
const userDb = new User();
const messageDb = new Messages();

module.exports = {
    userDb,
    messageDb
}