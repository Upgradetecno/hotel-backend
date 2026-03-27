const express = require("express");
const router = express.Router();
const db = require("../db");

// 🧠 CREAR RESERVA CON VALIDACIÓN
router.post("/", (req, res) => {
  const { nombre, email, telefono, habitacion_id, checkin, checkout } = req.body;

  // 1. Verificar disponibilidad
  const checkSql = `
    SELECT * FROM reservas
    WHERE habitacion_id = ?
    AND estado != 'cancelada'
    AND NOT (
      checkout <= ? OR checkin >= ?
    )
  `;

  db.query(checkSql, [habitacion_id, checkin, checkout], (err, results) => {
    if (err) return res.status(500).json(err);

    // ❌ si hay conflicto
    if (results.length > 0) {
      return res.status(400).json({
        mensaje: "La habitación no está disponible en esas fechas"
      });
    }

    // ✔ si está libre → crear reserva
    const insertSql = `
      INSERT INTO reservas
      (nombre, email, telefono, habitacion_id, checkin, checkout)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
      insertSql,
      [nombre, email, telefono, habitacion_id, checkin, checkout],
      (err2, result) => {
        if (err2) return res.status(500).json(err2);

        res.json({
          mensaje: "Reserva creada correctamente",
          id: result.insertId
        });
      }
    );
  });
});

module.exports = router;