const { Router } = require("express");
const { trainingHandler } = require("../Handler/trainingHandler");
const { getTrainingByName } = require("../Handler/trainingHandler");
const { getAlltraining } = require("../Handler/trainingHandler");
const { deletetraining } = require("../Handler/trainingHandler");
const { updateTraining } = require("../Handler/trainingHandler");

const { createSuccessStories } = require("../Handler/successHandler")
const { getAllSuccessStories } = require("../Handler/successHandler")
const { updateSuccessStories } = require("../Handler/successHandler")
const { deleteSuccessStories } = require("../Handler/successHandler")

const {
  postOfferHandler,
  deleteOfferHandler,
  getOfferHandler,
  updateOfferHandler,
} = require("../Handler/offersHandler");
const { loginHandler } = require("../Handler/loginHandler");

const { finterCountryHandler } = require("../Handler/filterCountry");


const {
  companiesSignUpHandler,
  getCompaniesHandler,
  updateCompanyHandler,
} = require("../Handler/companiesHandlers");
const {
  userSignUpHandler,
  getUsersHandler,
  updateUserHandler,
} = require("../Handler/userHandlers");
const {
  adminSignUpHandler,
  getAdminsHandler,
  updateAdminHandler,
} = require("../Handler/adminHandlers");
const {getRubrosHandler} = require("../Handler/rubrosHandler")
const {getPrefixesHandler} = require("../Handler/prefixesHandler")
const router = Router();
//Rutas de Offer
router.post("/offer", postOfferHandler);
router.delete("/offer", deleteOfferHandler);
router.get("/offer", getOfferHandler);
router.patch("/offer", updateOfferHandler);

// -----------------------Select de Countries--------------------------------
router.get("/countries", finterCountryHandler);

//--------------------------------------------

router.post("/login", loginHandler);
//---------------------company---------------------
router.post("/company/signup", companiesSignUpHandler);
router.get("/company/all", getCompaniesHandler);
router.patch("/company/update/:id", updateCompanyHandler);
//---------------------user---------------------
router.post("/user/signup", userSignUpHandler);
router.get("/user/all", getUsersHandler);
router.patch("/user/update/:id", updateUserHandler);
//---------------------admin---------------------
router.post("/admin/signup", adminSignUpHandler);
router.get("/admin/all", getAdminsHandler);
router.patch("/admin/update/:id", updateAdminHandler);
//---------------------training--------------------
router.get("/training", (req, res) => {
  const { name } = req.query;
  if (!name) {
    getAlltraining(req, res);
  } else {
    getTrainingByName(req, res);
  }
});
router.post("/training/create", trainingHandler);
router.delete("/training/delete", deletetraining);
router.patch("/training/update", updateTraining);
//--------------------Success-----------------------
router.post("/success/create", createSuccessStories)
router.get("/success/",getAllSuccessStories)
router.patch("/success/update", updateSuccessStories)
router.delete("/success/delete", deleteSuccessStories)

router.get("/categories", getRubrosHandler)
router.get("/prefixes", getPrefixesHandler)
module.exports = router;
