require("dotenv").config();

const mysql = require("mysql2/promise");

const coffeShop_db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

module.exports = coffeShop_db;
