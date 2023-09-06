const { where } = require("sequelize");
const { training, companies, areaTraining } = require("../../db");
const fs = require("fs");
const path = require("path");
const transporter = require("../../Tools/email");
require("dotenv").config();
const emailUser = process.env.EMAIL_USER;
const emailTemplate = fs.readFileSync(
  path.join(__dirname, "../../Templates/emailTraining.html"),
  "utf-8"
);

const createdTrainingController = async (body, companyId) => {
  try {
    const { name, description, video, category } = body;
    const { id } = companyId;

    const emailResponse = await companies.findOne({ where: { id: id } });
    const email = emailResponse.dataValues.email;

    const menssageRegister = {
      from: emailUser,
      to: email,
      subject: "Creacion de Capacitacion con Exíto",
      html: emailTemplate,
    };

    const [user, created] = await training.findOrCreate({
      where: {
        video: video,
      },
      defaults: {
        name,
        description,
        video,
      },
    });
    if (user) {
      for (let i = 0; i < category.length; i++) {
        const trainingCategory = await areaTraining.findOne({
          where: {
            name: category[i],
          },
        });
        await user.addAreaTraining(trainingCategory);
      }
    }

    await user.setCompany(id);

    transporter.sendMail(menssageRegister, (error, info) => {
      if (error) {
        console.error("Error al enviar el correo electrónico :", error);
      } else {
        console.log("Correo electrónico enviado con éxito:", info.response);
      }
    });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  createdTrainingController,
};
