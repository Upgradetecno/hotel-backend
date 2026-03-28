const express = require("express");
const router = express.Router();

const { enviarEmailReserva } = require("../services/emailService");

router.post("/enviar-email", async (req, res) => {
  try {
    const info = await enviarEmailReserva(req.body);
    res.json({ ok: true, messageId: info.messageId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error enviando email" });
  }
});

module.exports = router;