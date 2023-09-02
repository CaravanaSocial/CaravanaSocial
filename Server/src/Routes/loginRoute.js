const { Router } = require("express");
const {loginHandler} = require('../Handler/loginHandler')

const router = Router()

router.post("/", loginHandler);

module.exports = router