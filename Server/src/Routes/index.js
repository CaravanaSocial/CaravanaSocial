const { Router } = require("express");
const { trainingHandler } = require("../Handler/createTrainingHandler");
const { getTrainingByName } = require("../Handler/getTrainingHandler");
const { getAlltraining } = require("../Handler/getAllTraining");
const {
  postOfferHandler,
  deleteOfferHandler,
  getOfferHandler,
} = require("../Handler/offersHandler");
const { loginHandler } = require("../Handler/loginHandler");
const { userCompaniesUpHandler } = require("../Handler/companiesHandlers");
const { userSignUpHandler } = require("../Handler/userHandlers");
const { adminSignUpHandler } = require("../Handler/adminHandlers");

const router = Router();
//Rutas de Offer
router.post("/offer", postOfferHandler);
router.delete("/offer", deleteOfferHandler);
router.get("/offer", getOfferHandler);

//-----------------------------------------------

router.post("/login", loginHandler);
router.post("/signup/company", userCompaniesUpHandler);
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

router.post("/training/create", (req, res) => {
  trainingHandler(req, res);
});

module.exports = router;
