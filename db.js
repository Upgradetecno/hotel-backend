const mysql = require("mysql2");

const db = mysql.createPool({
  host: "mysql.railway.internal",
  user: "root",
  password: "olvSSATssNuvCStKPgmKenhXCjSfJPgP",
  database: "railway",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = db;