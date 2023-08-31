const { Router } = require("express");
const { trainingHandler } = require("../Handler/createTrainingHandler");
const { getTrainingByName } = require("../Handler/getTrainingHandler");
const { getAlltraining } = require("../Handler/getAllTraining");
const {
  postOfferHandler,
  deleteOfferHandler,
  getOfferHandler,
  updateOfferHandler,
} = require("../Handler/offersHandler");
const { loginHandler } = require("../Handler/loginHandler");

const { finterCountryHandler } = require("../Handler/filterCountry");

const { deletetraining } = require("../Handler/deleteTraining");
const { updateTraining } = require("../Handler/patchTraining");

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
router.get("/company/all", getCompaniesHandler)
router.patch("/company/update/:id", updateCompanyHandler)
//---------------------user---------------------
router.post("/user/signup", userSignUpHandler);
router.get("/user/all", getUsersHandler)
router.patch("/user/update/:id", updateUserHandler)
//---------------------admin---------------------
router.post("/admin/signup", adminSignUpHandler);
router.get("/admin/all", getAdminsHandler)
router.patch("/admin/update/:id", updateAdminHandler)


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

//cambios

router.patch("/training/update", updateTraining);

module.exports = router;
