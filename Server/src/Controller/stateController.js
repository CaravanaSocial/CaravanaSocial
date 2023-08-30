const states = require("../Tools/states.json");
const { state } = require("../db");

const CreateState = async () => {
  const dbInformation = await state.findAll();
  if (dbInformation.length === 0) {
    await state.bulkCreate(states.states);
    message = "La informacion de los estados se ha cargado correctamente";
  } else {
    message = "la informacion de los estados ya fue cargada";
  }

  return message;
};

module.exports = {
  CreateState,
};
