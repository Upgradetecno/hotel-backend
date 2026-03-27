const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 rutas correctas
app.use("/api", require("./routes/disponibilidad"));
app.use("/api", require("./routes/reservas"));

// 🧪 ruta base (para probar)
app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

// 🔥 puerto dinámico (IMPORTANTE para Render)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});