const { Router } = require("express");
const { trainingHandler } = require("../Handler/createTrainingHandler");
const { getTrainingByName } = require("../Handler/getTrainingHandler");
const { getAlltraining } = require("../Handler/getAllTraining");
const {postOfferHandler,deleteOfferHandler,getOfferHandler,updateOfferHandler} = require("../Handler/offersHandler");
const { loginHandler } = require("../Handler/loginHandler");
const { companiesSignUpHandler } = require("../Handler/companiesHandlers");
const { userSignUpHandler } = require("../Handler/userHandlers");
const { adminSignUpHandler } = require("../Handler/adminHandlers");
const { deletetraining } = require('../Handler/deleteTraining');
const { updateTraining } = require('../Handler/patchTraining')

const router = Router();
//Rutas de Offer
router.post("/offer", postOfferHandler);
router.delete("/offer", deleteOfferHandler);
router.get("/offer", getOfferHandler);
router.patch('/offer', updateOfferHandler)

//--------------------------------------------

router.post("/login", loginHandler);
router.post("/signup/company", companiesSignUpHandler);
router.post("/signup/user", userSignUpHandler);
router.post("/signup/admin", adminSignUpHandler);

router.get("/training", (req, res) => {
  const { name } = req.query;
  if (!name) {
    getAlltraining(req, res);
  } else {
    getTrainingByName(req, res);
  }
});

router.post("/training/create",trainingHandler);

router.delete('/training/delete', deletetraining)


//cambios

router.patch("/training/update", updateTraining)

module.exports = router;
