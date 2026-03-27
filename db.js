const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Nico2314!",
  database: "hotel"
});

module.exports = db;