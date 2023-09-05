const nodemailer = require("nodemailer");
require("dotenv").config();

const emailUser = process.env.EMAIL_USER;
const emailPassword = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: emailUser,
    pass: emailPassword,
  },
});

module.exports = transporter;

// Outlook/Hotmail: Para Outlook.com o cuentas de Hotmail, el host podría ser smtp.live.com o smtp.outlook.com. También necesitarás configurar la autenticación adecuada.

// Yahoo Mail: Para cuentas de Yahoo Mail, el host podría ser smtp.mail.yahoo.com.

// Otros proveedores de correo: Cada proveedor de correo electrónico puede tener su propio servidor SMTP, por lo que debes consultar la documentación del proveedor o buscar en línea el host SMTP específico que debes utilizar.

// Servidores propios: Si tienes un servidor de correo electrónico propio, el host dependerá de la configuración de ese servidor.
