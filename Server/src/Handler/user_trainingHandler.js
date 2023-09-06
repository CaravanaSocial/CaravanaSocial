const {userToTrainingController} = require("../Controller/User_training/userToTrainingController");
const {usersByTrainingController} = require("../Controller/User_training/usersByTrainingController");
const {trainingsByUserController} = require('../Controller/User_training/trainingsByUserController')

//--------POST--------------

const userToTrainingHandler = async (req, res) => {
  try {
    const response = await userToTrainingController(req.body);
    response && res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//--------GET---------------

const usersByTrainingHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await usersByTrainingController(id);
    response
      ? res.status(200).json(response)
      : res.status(404).send("No hay usuarios suscritos a esta capacitacion");
  } catch (error) {
    return res.status(500).json(error);
  }
};
const trainingsByUserHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await trainingsByUserController(id);
    response
      ? res.status(200).json(response)
      : res.status(404).send("El usuario no esta suscrito a ninguna capacitacion");
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  userToTrainingHandler,
  usersByTrainingHandler,
  trainingsByUserHandler
  
};
