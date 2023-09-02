const { Router } = require("express");
const {companiesSignUpHandler, getCompaniesHandler, updateCompanyHandler} = require('../Handler/companiesHandlers')

const router = Router()

router.post("/signup", companiesSignUpHandler);
router.get("/all", getCompaniesHandler);
router.patch("/update/:id", updateCompanyHandler);

module.exports = router