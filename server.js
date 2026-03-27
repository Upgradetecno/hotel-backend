const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 rutas correctas
app.use("/api", require("./routes/disponibilidad"));
app.use("/api", require("./routes/reservas"));

// 🧪 rutas de prueba
app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

app.get("/test", (req, res) => {
  res.send("TEST OK");
});

// 🔥 puerto dinámico
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});