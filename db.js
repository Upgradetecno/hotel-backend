const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "mysql.railway.internal",
  user: "root",
  password: "olvSSATssNuvCStKPgmKenhXCjSfJPgP",
  database: "railway",
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.log("❌ Error MySQL:", err.message);
  } else {
    console.log("✅ MySQL conectado");
  }
});

module.exports = db;