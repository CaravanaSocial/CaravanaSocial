const { Router } = require("express");
const {adminSignUpHandler, getAdminsHandler, updateAdminHandler, getAdminsByIdHandler, deleteAdminHandler, restoreAdminHandler} = require('../Handler/adminHandlers')
const {validateAdminAccount} = require("../Middlewares/validateAdminAccount")
const router = Router()

router.post("/signup",validateAdminAccount ,adminSignUpHandler);
router.get("/all", getAdminsHandler);
router.patch("/update/:id", updateAdminHandler);
router.get("/:id", getAdminsByIdHandler);
router.delete("/:id", deleteAdminHandler)
router.post("/restore/:id", restoreAdminHandler)

module.exports = router