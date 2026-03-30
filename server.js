const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const db = require("./db"); 

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

// 🔐 LOGIN ADMIN (FUERA del listen)
app.post('/api/admin/login', async (req, res) => {
  try {

    console.log("👉 Entró al login");

    const { usuario, password } = req.body;

    const [rows] = await db.query(
      'SELECT * FROM usuarios WHERE usuario = ?',
      [usuario]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    const user = rows[0];

    if (password !== user.password) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: user.id },
      'secreto_super_seguro',
      { expiresIn: '2h' }
    );

    res.json({ token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// 🔥 puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});