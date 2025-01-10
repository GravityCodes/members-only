const pool = require("./pool");

class User {
    async insertUser(params) {
        const query = `
        INSERT INTO users (firstname, lastname, username, password, member_status)
        VALUES($1,$2,$3,$4,$5);
        `
        await pool.query(query, [params.firstname, params.lastname, params.username, params.password, false]);
    }
}

module.exports = new User();