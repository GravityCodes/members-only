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
}

module.exports = new User();