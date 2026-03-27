const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/disponibilidad", (req, res) => {
  const { desde, hasta } = req.query;

  const query = `
    SELECT 
      h.id,
      h.nombre,
      h.capacidad,
      h.precio_base,
      h.cantidad_total,
      (h.cantidad_total - COUNT(r.id)) AS disponibles
    FROM habitaciones h
    LEFT JOIN reservas r 
      ON h.id = r.habitacion_id
      AND r.estado = 'confirmada'
      AND NOT (
        r.fecha_salida <= ?
        OR r.fecha_entrada >= ?
      )
    GROUP BY h.id
  `;

  db.query(query, [desde, hasta], (err, results) => {
    if (err) {
  console.log("ERROR SQL:", err);
  return res.status(500).json({ error: err.message });
}

    res.json(results);
  });
});

module.exports = router;