const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "MYSQL80",
  password: "Nico2314!",
  database: "hotel"
});

// 👇 AGREGÁ ESTO
db.connect((err) => {
  if (err) {
    console.log("❌ Error MySQL (normal en Render):", err.message);
  } else {
    console.log("✅ MySQL conectado");
  }
});

module.exports = db;