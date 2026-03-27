const mysql = require("mysql2");

const db = mysql.createPool({
  host: "crossover.proxy.rlwy.net",
  user: "root",
  password: "olvSSATssNuvCStKPgmKenhXCjSfJPgP",
  database: "railway",
  port: 17043,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = db;