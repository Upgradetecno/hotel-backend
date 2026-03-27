const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/reservar", (req, res) => {
  const {
    habitacion_id,
    nombre,
    email,
    telefono,
    fecha_entrada,
    fecha_salida
  } = req.body;

  const query = `
    INSERT INTO reservas 
    (habitacion_id, nombre, email, telefono, fecha_entrada, fecha_salida)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [habitacion_id, nombre, email, telefono, fecha_entrada, fecha_salida],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Error al reservar" });
      }

      res.json({ success: true });
    }
  );
});

module.exports = router;