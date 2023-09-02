const { Router } = require("express");
const {userSignUpHandler, getUsersHandler, updateUserHandler} = require('../Handler/userHandlers')
const {validateUserAccount} = require("../Middlewares/validateUserAccount")
const router = Router()

router.post("/signup", validateUserAccount, userSignUpHandler);
router.get("/all", getUsersHandler);
router.patch("/update/:id", updateUserHandler);

module.exports = router