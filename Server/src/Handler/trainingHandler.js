const {
  delTrainingController,
} = require("../Controller/Trainings/delTraining");
const { updateTrainingController } = require("../Controller/Trainings/changer");
const {
  createdTrainingController,
} = require("../Controller/Trainings/getCreatedTraining");
const { getAll } = require("../Controller/Trainings/getAll");
const { getTrainingOnDb } = require("../Controller/Trainings/getTrainingOnDb");
const {
  getTrainingByIdController,
} = require("../Controller/Trainings/getTrainingByIdController");
const { aproveTrainingController } = require("../Controller/Trainings/aproveTriningController")

const getAlltraining = async (req, res) => {
  try {
    const { option } = req.query;
      const getTrainings = await getAll(option);

      if (getTrainings.length === 0)
        return res
          .status(400)
          .json({ error: "No hay capacitaciones existentes" });
  
      return res.status(200).json(getTrainings);
    

  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const getTrainingByName = async (req, res) => {
  try {
    const { name } = req.query;

    const getTraining = await getTrainingOnDb(name);
    if (getTraining.length === 0)
      return res
        .status(200)
        .json(getTraining);

    return res.status(200).json(getTraining);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const createTrainingHandler = async (req, res) => {
  try {
    const foundTraining = await createdTrainingController(req.body, req.params);

    return res.status(200).json(foundTraining);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateTrainingHandler = async (req, res) => {
  try {
    const {id} = req.params
    const allDone = await updateTrainingController(req.body, id);

    if (!allDone) return res.status(400).send("Algo salio mal ");

    return res.status(200).json(allDone);
  } catch (error) {
    console.log("EL ERROR ES: ",error);
    res.status(400).json({error:error.message});
  }
};

const deletetrainingHandler = async (req, res) => {
  const { id } = req.query;
  const trainingDeleted = await delTrainingController(id);
  if (trainingDeleted)
    return res.status(200).send("La capacitacion fue eliminada");
  return res.status(404).send("La capacitacion no se ha encontrado");
};

const getTrainingByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const training = await getTrainingByIdController(id);
    res.status(200).json(training);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const aproveTrainingHandler =  async ( req, res) => {
  try {
    console.log("ENTRA EL HANDLERRRR de aprove");
    const { id } =  req.params;
    const { answer } = req.body;

    const response = await aproveTrainingController(id, answer);
    console.log("SALE DE APROVETRAININGCONTROLLER");
    return res.status(200).json(response)

  } catch (error) {
    return res.status(400).send(error.message)
  }
}

module.exports = {
  updateTrainingHandler,
  createTrainingHandler,
  getTrainingByName,
  getAlltraining,
  deletetrainingHandler,
  getTrainingByIdHandler,
  aproveTrainingHandler
};
