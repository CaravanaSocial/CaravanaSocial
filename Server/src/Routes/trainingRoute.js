const { Router } = require("express");
const {getAlltraining, getTrainingByName, trainingHandler, deletetraining, updateTraining, getTrainingByIdHandler} = require('../Handler/trainingHandler')


const router = Router()

router.get("/", (req, res) => {
    const { name } = req.query;
    if (!name) {
      getAlltraining(req, res);
    } else {
      getTrainingByName(req, res);
    }
  });
router.post("/:id", trainingHandler);
router.delete("/delete", deletetraining);
router.patch("/update", updateTraining);
router.get("/:id", getTrainingByIdHandler)

module.exports = router