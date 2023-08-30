const { Router } = require("express");
const { trainingHandler } = require("../Handler/createTrainingHandler");
const { getTrainingByName } = require("../Handler/getTrainingHandler");
const { getAlltraining } = require("../Handler/getAllTraining");
const {postOfferHandler,deleteOfferHandler,getOfferHandler,updateOfferHandler} = require("../Handler/offersHandler");
const { loginHandler } = require("../Handler/loginHandler");
const { companiesSignUpHandler } = require("../Handler/companiesHandlers");
const { userSignUpHandler } = require("../Handler/userHandlers");
const { adminSignUpHandler } = require("../Handler/adminHandlers");
const { createCountries } = require("../Controller/CountriesController");
const { CreateState } = require("../Controller/stateController");
const { CreateCities } = require("../Controller/citiesController");

const router = Router();
//Rutas de Offer
router.post("/offer", postOfferHandler);
router.delete("/offer", deleteOfferHandler);
router.get("/offer", getOfferHandler);
router.patch('/offer', updateOfferHandler)
//-----------------------------------------------
router.get("/countries", createCountries);
router.get("/states", CreateState);
router.get("/cities", CreateCities);
//-----------------------------------------------

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

router.post("/training/create", (req, res) => {
  trainingHandler(req, res);
});

module.exports = router;
