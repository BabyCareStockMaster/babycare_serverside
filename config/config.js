require('dotenv').config();

const config = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: "postgres",
    },
    test: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME_5,
        host: process.env.DB_HOST,
        dialect: "postgres",
    }
}


module.exports = config;

console.log("DB_PASS value:", process.env.DB_PASS);