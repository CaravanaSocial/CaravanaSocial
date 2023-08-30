const states = require("../Tools/states.json");
const { state } = require("../db");

const CreateState = async (req, res) => {
  const response = await state.bulkCreate(states.states);
  try {
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send("Error occurred");
  }
};

module.exports = {
  CreateState,
};
