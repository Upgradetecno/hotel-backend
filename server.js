const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 rutas
app.use("/api/disponibilidad", require("./routes/disponibilidad"));
app.use("/api/reservas", require("./routes/reservas"));

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});