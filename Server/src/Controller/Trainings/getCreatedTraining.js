const { where } = require("sequelize");
const { training, companies, areaTraining, admin } = require("../../db");
const fs = require("fs");
const path = require("path");
const transporter = require("../../Tools/email");
require("dotenv").config();
const emailUser = process.env.EMAIL_USER;
const emailTemplate = fs.readFileSync(
  path.join(__dirname, "../../Templates/emailTraining.html"),
  "utf-8"
);
const { uploadImage } = require('../../Tools/imageCloudinary')

const createdTrainingController = async (body, companyId) => {
  try {
    const { name, description, video, category } = body;
    const { id } = companyId;
    var email;
    const emailResponseCompany = await companies.findOne({ where: { id: id } });
    const emailResponseAdmin = await admin.findOne({ where: { id: id } });

    if(emailResponseCompany){
      email = emailResponseCompany.dataValues.email;
    }else if(emailResponseAdmin){
      email = emailResponseAdmin.dataValues.email;
    }

    const menssageRegister = {
      from: emailUser,
      to: email,
      subject: "Creacion de Capacitacion con Exíto",
      html: emailTemplate,
    };
      // const imagenNice = uploadImage(video);

    const createdTraining = await training.create(
      {
        name,
        description,
        video,
      },
    );
    if (createdTraining) {
      for (let i = 0; i < category.length; i++) {
        const trainingCategory = await areaTraining.findOne({
          where: {
            name: category[i],
          },
        });
        await createdTraining.addAreaTraining(trainingCategory);
      }
    }
    const foundCompany = await companies.findOne({where:{id}}) 
    if(foundCompany) await createdTraining.setCompany(id);
    const foundAdmin = await admin.findOne({where:{id}})
    if(foundAdmin) await createdTraining.setAdmin(id);

    transporter.sendMail(menssageRegister, (error, info) => {
      if (error) {
        console.error("Error al enviar el correo electrónico :", error);
      } else {
        console.log("Correo electrónico enviado con éxito:", info.response);
      }
    });

    return createdTraining;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  createdTrainingController,
};
