const { companies } = require("../../db");
const { areaTraining, training, offer } = require("../../db");

const path = require("path");
const transporter = require("../../Tools/email");
const fs = require("fs");
const emailUser = process.env.EMAIL_USER;
const emailTemplate = fs.readFileSync(
  path.join(__dirname, "../../Templates/emailRecovery.html"),
  "utf-8"
);

const getCompanyAccController = async (email, code) => {
  const emailTemplateConValores = emailTemplate.replace("${randomCode}", code);

  const companyAcc = await companies.findOne({
    where: { email },
    include: [
      {
        model: areaTraining,
        attributes: ["name"],
        through: { attributes: [] },
      },
      {
        model: training,
      },
      {
        model: offer,
      },
    ],
  });

  if (code && companyAcc) {
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

  return companyAcc;
};

module.exports = {
  getCompanyAccController,
};
