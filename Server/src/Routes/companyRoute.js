const { Router } = require("express");
const {companiesSignUpHandler, getCompaniesHandler, updateCompanyHandler, getCompanyByIdHandler, deleteCompanyHandler, restoreCompanyHandler} = require('../Handler/companiesHandlers')
const { validateCompanyAccount } = require("../Middlewares/validateCompanyAccount")
const router = Router()

router.post("/signup", validateCompanyAccount, companiesSignUpHandler);
router.get("/all", getCompaniesHandler);
router.patch("/update/:id", updateCompanyHandler);
router.get("/:id", getCompanyByIdHandler);
router.delete("/:id", deleteCompanyHandler)
router.post("/restore/:id", restoreCompanyHandler)

module.exports = router