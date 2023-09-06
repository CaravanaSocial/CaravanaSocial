const { Router } = require("express");
const {
  userSignUpHandler,
  getUsersHandler,
  updateUserHandler,
  getUsersByIdHandler,
  getFreelancersHandler,
  deleteUserHandler,
  restoreUserHandler
} = require("../Handler/userHandlers");
const { validateUserAccount } = require("../Middlewares/validateUserAccount");
const router = Router();

router.post("/signup", validateUserAccount, userSignUpHandler);
router.get("/all", getUsersHandler);
router.patch("/update/:id", updateUserHandler);
router.get("/freelancers", getFreelancersHandler);
router.get("/:id", getUsersByIdHandler);
router.delete("/:id", deleteUserHandler)
router.post("/restore/:id", restoreUserHandler)
module.exports = router;

