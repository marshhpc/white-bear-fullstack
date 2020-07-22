require("dotenv").config();
const mysql = require("mysql");
const nodeUtil = require("util");

const db = mysql.createPool({
   connectionLimit: 10,
   host: process.env.RDS_HOST,
   user: process.env.RDS_USER,
   password: process.env.RDS_PASSWORD,
   database: "white_bear_app",
});

db.query = nodeUtil.promisify(db.query);

module.exports = db;
