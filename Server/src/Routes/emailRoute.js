const { Router } = require("express");
const { emailVerifyHandler } = require("../Handler/emailHandler.js");

const router = Router();

router.get("/", emailVerifyHandler);

module.exports = router;
