const { Router } = require("express");
const {
  userSignUpHandler,
  getUsersHandler,
  updateUserHandler,
  getUsersByIdHandler,
  getFreelancersHandler,
} = require("../Handler/userHandlers");
const { validateUserAccount } = require("../Middlewares/validateUserAccount");
const router = Router();

router.post("/signup", validateUserAccount, userSignUpHandler);
router.get("/all", getUsersHandler);
router.patch("/update/:id", updateUserHandler);
router.get("/freelancers", getFreelancersHandler);
router.get("/:id", getUsersByIdHandler);

module.exports = router;
