const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Ruta para recibir el formulario
app.post('/enviar-correo', async (req, res) => {
  const { nombre, correo, mensaje } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'tu.correo@gmail.com',         // Cambia esto
        pass: 'tu_contraseña_app'            // Usa contraseña de aplicación
      }
    });

    const mailOptions = {
      from: correo,
      to: 'tu.correo@gmail.com',             // Cambia esto
      subject: `Nuevo mensaje de ${nombre}`,
      text: mensaje
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Correo enviado exitosamente' });
  } catch (error) {
    console.error('Error al enviar correo:', error);
    res.status(500).json({ message: 'Error al enviar el correo' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
