const { Router } = require("express");
const {
  getAlltraining,
  getTrainingByName,
  createTrainingHandler,
  deletetrainingHandler,
  updateTrainingHandler,
  getTrainingByIdHandler,
  aproveTrainingHandler 
} = require("../Handler/trainingHandler");

const router = Router();

router.get("/", (req, res) => {
  const { name } = req.query;
  if (!name) {
    getAlltraining(req, res);
  } else {
    getTrainingByName(req, res);
  }
});
router.post("/:id", createTrainingHandler);
router.delete("/delete", deletetrainingHandler);
router.patch("/:id", updateTrainingHandler);
router.get("/:id", getTrainingByIdHandler);
router.patch("/admin/:id", aproveTrainingHandler)

module.exports = router;
