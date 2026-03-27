const express = require("express");
const router = express.Router();
const db = require("../db");

// disponibilidad por rango de fechas
router.get("/", (req, res) => {
  const { desde, hasta } = req.query;

  const sql = `
    SELECT h.*
    FROM habitaciones h
    WHERE h.id NOT IN (
      SELECT r.habitacion_id
      FROM reservas r
      WHERE r.estado != 'cancelada'
      AND NOT (
        r.checkout <= ?
        OR r.checkin >= ?
      )
    )
  `;

  db.query(sql, [desde, hasta], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

module.exports = router;