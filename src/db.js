const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    post: "localhost",
    database: "students",
    password: "shetty123",
    port: 5432,
});

module.exports = pool;
