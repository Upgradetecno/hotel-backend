const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER || "",
    pass: process.env.EMAIL_PASS || ""
  }
});

async function enviarEmailReserva(data) {
  return transporter.sendMail({
    from: `"Hotel Avenida" <${process.env.EMAIL_USER}>`,
    to: data.to,
    subject: data.subject || "Nueva reserva",
    html: `
      <div style="font-family:Arial">
        <h2>🏨 Nueva Reserva</h2>

        <p><b>Nombre:</b> ${data.data.nombre}</p>
        <p><b>Email:</b> ${data.data.email}</p>
        <p><b>Teléfono:</b> ${data.data.telefono || "-"}</p>

        <hr>

        <p><b>Habitación:</b> ${data.data.habitacion_nombre}</p>
        <p><b>Check-in:</b> ${data.data.fecha_entrada}</p>
        <p><b>Check-out:</b> ${data.data.fecha_salida}</p>
      </div>
    `
  });
}

module.exports = { enviarEmailReserva };