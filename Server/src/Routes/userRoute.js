const { Router } = require("express");
const {userSignUpHandler, getUsersHandler, updateUserHandler} = require('../Handler/userHandlers')

const router = Router()

router.post("/signup", userSignUpHandler);
router.get("/all", getUsersHandler);
router.patch("/update/:id", updateUserHandler);

module.exports = router