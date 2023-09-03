const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { user } = require("../../db");
const { SIGNATURE } = process.env;
const { areaTraining } = require("../../db");

const createUserAccController = async (props) => {
  console.log("ENTRA AL CONTROLADOR DE CREACIÓN");
  console.log("PRRRRRRRRRRRRRRRRROPS", props);
  const { password, email, category } = props;
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const [newUser, created] = await user.findOrCreate({
    where: { email },
    defaults: {
      name: props.name,
      lastName: props.lastName,
      birthDate: props.birthDate,
      location: props.location,
      //   CUD: props.CUD,
      //   category: props.category,
      email: props.email,

      //   certificates: props.certificates,
      freelancer: props.freelancer,
      description: props.description,
      address: props.address,
      password: hashedPassword,
    },
  });

  console.log("DESPIEs", props);
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
    const userId = newUser.id;
    // const token = jwt.sign({ userId }, SIGNATURE);
    returning.password = 0;
    return { acc: returning };
  }
  return "used";
};

module.exports = {
  createUserAccController,
};
