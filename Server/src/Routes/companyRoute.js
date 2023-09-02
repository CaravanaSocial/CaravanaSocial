const { Router } = require("express");
const {companiesSignUpHandler, getCompaniesHandler, updateCompanyHandler, getCompanyByIdHandler} = require('../Handler/companiesHandlers')
const { validateCompanyAccount } = require("../Middlewares/validateCompanyAccount")
const router = Router()

router.post("/signup", validateCompanyAccount, companiesSignUpHandler);
router.get("/all", getCompaniesHandler);
router.patch("/update/:id", updateCompanyHandler);
router.get("/:id", getCompanyByIdHandler);

module.exports = router