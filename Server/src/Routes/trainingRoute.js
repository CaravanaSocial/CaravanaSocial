const { Router } = require("express");
const {getAlltraining, getTrainingByName, trainingHandler, deletetraining, updateTraining } = require('../Handler/trainingHandler')


const router = Router()

router.get("/", (req, res) => {
    const { name } = req.query;
    if (!name) {
      getAlltraining(req, res);
    } else {
      getTrainingByName(req, res);
    }
  });
router.post("/create", trainingHandler);
router.delete("/delete", deletetraining);
router.patch("/update", updateTraining);

module.exports = router