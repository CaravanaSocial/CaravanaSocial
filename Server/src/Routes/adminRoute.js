const { Router } = require("express");
const {adminSignUpHandler, getAdminsHandler, updateAdminHandler} = require('../Handler/adminHandlers')

const router = Router()

router.post("/signup", adminSignUpHandler);
router.get("/all", getAdminsHandler);
router.patch("/update/:id", updateAdminHandler);

module.exports = router