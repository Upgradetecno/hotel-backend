const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// 📦 rutas
app.use("/api", require("./routes/disponibilidad"));
app.use("/api", require("./routes/reservas"));
app.use("/api", require("./routes/email"));

// 🧪 test
app.get("/", (req, res) => {
  res.send("API Hotel funcionando 🚀");
});

// 🔥 puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});