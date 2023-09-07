const { createSuccSto } = require("../Controller/SuccessStories/createSuccSto");
const {
  getSuccessStories,
} = require("../Controller/SuccessStories/getSuccessStories");
const { changeStory } = require("../Controller/SuccessStories/changeStory");
const { delSuc } = require("../Controller/SuccessStories/delSuc");

const createSuccessStories = async (req, res) => {
  try {
    const newSuccessStories = await createSuccSto(req.body);

    if (newSuccessStories) {
      return res.status(200).send("Caso de exito creado correctamente");
    } else {
      return res.status(400).send("Caso de exito ya existente");
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const getAllSuccessStories = async (req, res) => {
  try {
    const allSuccess = await getSuccessStories();

    if (allSuccess.length === 0) throw new Error("No hay Casos de exito");

    return res.status(200).json(allSuccess);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const updateSuccessStories = async (req, res) => {
  try {
    const updatedStory = await changeStory(req.body);

    if (!updatedStory)
      return res.status(400).send("No se ha podido actualizar");

    return res.status(200).json(updatedStory);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const deleteSuccessStories = async (req, res) => {
  try {
    const { id } = req.query;
    const deletedSuccess = await delSuc(id);

    if (deletedSuccess) {
      return res
        .status(200)
        .send("El caso de exito fue eliminado exitosamente");
    } else {
      return res.status(400).send("No se pudo eliminar el caso de exito");
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = {
  deleteSuccessStories,
  createSuccessStories,
  getAllSuccessStories,
  updateSuccessStories,
};
