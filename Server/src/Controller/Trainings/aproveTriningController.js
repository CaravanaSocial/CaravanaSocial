const { training, companies } = require("../../db");
const transporter = require("../../Tools/email");
const path = require("path");
require("dotenv").config();
const emailUser = process.env.EMAIL_USER;
const fs = require("fs");
const emailTemplate1 = fs.readFileSync(
  path.join(__dirname, "../../Templates/trainingApproved.html"),
  "utf-8"
);
const emailTemplate2 = fs.readFileSync(
  path.join(__dirname, "../../Templates/trainingDeclined.html"),
  "utf-8"
);

const aproveTrainingController = async (id, answer) => {
  const trainingResponse = await training.findOne({
    where: { id: id },
    include: [{ model: companies }],
  });


  console.log("LLEGA??", trainingResponse.dataValues);

  const email = trainingResponse?.dataValues?.company?.email ? trainingResponse?.dataValues?.company?.email : trainingResponse?.dataValues?.admin?.email;
  console.log("EMAILLL: ",email);

  const trainingApproved = {
    from: emailUser,
    to: email,
    subject: "Capacitacion aceptada",
    html: emailTemplate1,
  };

  const trainingDeclined = {
    from: emailUser,
    to: email,
    subject: "Capacitacion rechazada",
    html: emailTemplate2,
  };

  try {
    if (answer) {
      const approved = await training.update(
        { approved: answer },
        { where: { id } }
      );

      transporter.sendMail(trainingApproved, (error, info) => {
        if (error) {
          console.error("Error al enviar el correo electrónico :", error);
        } else {
          console.log("Correo electrónico enviado con éxito:", info.response);
        }
      });

      return approved;
    } else {
      const declined = await training.update(
        { approved: answer },
        { where: { id } }
      );

      transporter.sendMail(trainingDeclined, (error, info) => {
        if (error) {
          console.error("Error al enviar el correo electrónico :", error);
        } else {
          console.log("Correo electrónico enviado con éxito:", info.response);
        }
      });

      return declined;
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  aproveTrainingController,
};
