const { Router } = require("express");
const { trainingHandler } = require("../Handler/trainingHandler");
const { getTrainingByName } = require("../Handler/trainingHandler");
const { getAlltraining } = require("../Handler/trainingHandler");
const {
  postOfferHandler,
  deleteOfferHandler,
  getOfferHandler,
  updateOfferHandler,
} = require("../Handler/offersHandler");
const { loginHandler } = require("../Handler/loginHandler");

const { deletetraining } = require('../Handler/deleteTraining');
const { updateTraining } = require('../Handler/patchTraining')

const { deletetraining } = require("../Handler/trainingHandler");
const { updateTraining } = require("../Handler/trainingHandler");


const router = Router();
//Rutas de Offer
router.post("/offer", postOfferHandler);
router.delete("/offer", deleteOfferHandler);
router.get("/offer", getOfferHandler);
router.patch('/offer', updateOfferHandler)

//--------------------------------------------

router.post("/login", loginHandler);
//---------------------company---------------------
router.post("/company/signup", companiesSignUpHandler);
router.get("/company/all", getCompaniesHandler)
router.patch("/company/update", updateCompanyHandler)
//---------------------user---------------------
router.post("/user/signup", userSignUpHandler);
router.get("/user/all", getUsersHandler)
router.patch("/user/update", updateUserHandler)
//---------------------admin---------------------
router.post("/admin/signup", adminSignUpHandler);
router.get("/admin/all", getAdminsHandler)
router.patch("/admin/update", updateAdminHandler)

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
