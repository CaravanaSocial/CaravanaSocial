const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const { companies } = require("../../db");
const emailUser = process.env.EMAIL_USER;
const { SIGNATURE } = process.env;
require("dotenv").config();
const { areaTraining } = require("../../db");
const transporter = require("../../Tools/email");
const emailTemplate = fs.readFileSync(
  path.join(__dirname, "../../Templates/emailRegisterCompany.html"),
  "utf-8"
);

const createCompanyAccController = async (props) => {
  const { password, email, category } = props;
  const randomCode = Math.round(Math.random()*999999)
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const defaultProfilePicture =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png";
  const [newCompany, created] = await companies.findOrCreate({
    where: { email: email.toLowerCase() },
    defaults: {
      ...props,
      email: email.toLowerCase(),
      password: hashedPassword,
      profilePicture: defaultProfilePicture,
      verificationCode: randomCode
    },
  });

  const menssageRegister = {
    from: emailUser,
    to: email,
    subject: `Confirmación de Registro: Verifica tu codigo ${randomCode} en http://localhost:5173/verification/${newCompany.id}`,
    html: emailTemplate,
  };

  if (created) {
    //CREAR LA RELACIÓN CON EL RUBRO
    for (let i = 0; i < category.length; i++) {
      const categoryId = (
        await areaTraining.findOne({
          where: {
            name: category[i],
          },
        })
      ).id;
      await newCompany.addAreaTraining(categoryId);
    }
    const returning = await companies.findOne({
      where: {
        id: newCompany.id,
      },
      include: [
        {
          model: areaTraining,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    });

    /*         const companyId = newCompany.id
        const token = jwt.sign({companyId},SIGNATURE) */
    returning.password = 0;

    transporter.sendMail(menssageRegister, (error, info) => {
      if (error) {
        console.error("Error al enviar el correo electrónico :", error);
      } else {
        console.log("Correo electrónico enviado con éxito:", info.response);
      }
    });

    return { acc: returning /* , token */ };
  }
  return "used";
};

module.exports = {
  createCompanyAccController,
};
