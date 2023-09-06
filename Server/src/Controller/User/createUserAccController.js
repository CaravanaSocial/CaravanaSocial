const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fs = require("fs");
require("dotenv").config();
const nodemailer = require("nodemailer");
const path = require("path");
const transporter = require("../../Tools/email");
const { user } = require("../../db");
const { SIGNATURE } = process.env;

const { areaTraining } = require("../../db");
const emailUser = process.env.EMAIL_USER;
const emailTemplate = fs.readFileSync(
  path.join(__dirname, "../../Templates/emailRegister.html"),
  "utf-8"
);

const createUserAccController = async (props) => {
  const { password, email, category } = props;
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const defaultProfilePicture =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png";
  const [newUser, created] = await user.findOrCreate({
    where: { email },
    defaults: {
      name: props.name,
      lastName: props.lastName,
      birthDate: props.birthDate,
      location: props.location,
      CUD: props.CUD,
      email: props.email,
      profilePicture: defaultProfilePicture,
      freelancer: props.freelancer,
      description: props.description,
      address: props.address,
      password: hashedPassword,
    },
  });

  const menssageRegister = {
    from: emailUser,
    to: email,
    subject: "Confirmación de Registro",
    html: emailTemplate,
  };

  if (created) {
    for (let i = 0; i < category.length; i++) {
      const categoryId = (
        await areaTraining.findOne({
          where: {
            name: category[i],
          },
        })
      ).id;
      await newUser.addAreaTraining(categoryId);
    }
    const returning = await user.findOne({
      where: {
        id: newUser.id,
      },
      include: [
        {
          model: areaTraining,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    });
    /* const userId = newUser.id;
    const token = jwt.sign({ userId }, SIGNATURE); */
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
  createUserAccController,
};
