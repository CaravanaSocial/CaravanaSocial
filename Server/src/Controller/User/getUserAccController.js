const { user } = require("../../db");
const { areaTraining } = require("../../db");

const path = require("path");
const transporter = require("../../Tools/email");
const fs = require("fs");
const emailUser = process.env.EMAIL_USER;
const emailTemplate = fs.readFileSync(
  path.join(__dirname, "../../Templates/emailRecovery.html"),
  "utf-8"
);

const getUserAccController = async (email, code) => {
  const userAcc = await user.findOne({
    where: { email },
    include: [
      {
        model: areaTraining,
        attributes: ["name"],
        through: { attributes: [] },
      },
    ],
  });

  if (code && userAcc) {
    const emailTemplateConValores = emailTemplate.replace(
      "${randomCode}",
      code
    );

    const menssageRegister = {
      from: emailUser,
      to: email,
      subject: `Codigo de recuperacion`,
      html: emailTemplateConValores,
    };
    transporter.sendMail(menssageRegister, (error, info) => {
      if (error) {
        console.error("Error al enviar el correo electrónico :", error);
      } else {
        console.log("Correo electrónico enviado con éxito:", info.response);
      }
    });
  }

  return userAcc;
};

module.exports = {
  getUserAccController,
};
