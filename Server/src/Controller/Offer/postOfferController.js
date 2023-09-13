const { offer, admin } = require("../../db");
const { areaTraining, companies} = require("../../db");
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");
const transporter = require("../../Tools/email");
require("dotenv").config();
const emailUser = process.env.EMAIL_USER;
const emailTemplate = fs.readFileSync(
  path.join(__dirname, "../../Templates/emailOffer.html"),
  "utf-8"
);

const postOfferController = async (info) => {
  const { title, description, category } = info.data;
  const { id } = info;

  const emailResponseCompany = await companies.findOne({ where: { id: id } });
  const emailResponseAdmin = await admin.findOne({ where: { id: id } });
  if(emailResponseCompany){
    var email = emailResponseCompany.dataValues.email;
  }else if(emailResponseAdmin){
    var email = emailResponseAdmin.dataValues.email;
  }

  const menssageRegister = {
    from: emailUser,
    to: email,
    subject: "Creacion de oferta Laboral",
    html: emailTemplate,
  };

  if (title && description && id) {
    const [user, created] = await offer.findOrCreate({
      where: { title: title },
      defaults: { title: title, description: description },
    });
    if (created) {
      for (let i = 0; i < category.length; i++) {
        const userCategory = await areaTraining.findOne({
          where: { name: category[i] },
        });
        await user.addAreaTraining(userCategory);
      }
      if(emailResponseCompany){
        await user.setCompany(id);
      }else if (emailResponseAdmin){
        await user.setAdmin(id);

      }

      transporter.sendMail(menssageRegister, (error, info) => {
        if (error) {
          console.error("Error al enviar el correo electrónico :", error);
        } else {
          console.log("Correo electrónico enviado con éxito:", info.response);
        }
      });

      return user;
    } else return created;
  } else throw new Error("Info invalida o incorrecta");
};

module.exports = {
  postOfferController,
};
