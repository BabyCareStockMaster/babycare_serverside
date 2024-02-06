require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": "BabyCare",
    "host": "localhost",
    "dialect": "postgres"
  }
}