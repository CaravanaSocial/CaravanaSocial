const { Router } = require("express");
const {companiesSignUpHandler, getCompaniesHandler, updateCompanyHandler} = require('../Handler/companiesHandlers')
const { validateCompanyAccount } = require("../Middlewares/validateCompanyAccount")
const router = Router()

router.post("/signup", validateCompanyAccount, companiesSignUpHandler);
router.get("/all", getCompaniesHandler);
router.patch("/update/:id", updateCompanyHandler);

module.exports = router