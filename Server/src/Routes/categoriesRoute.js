const { Router } = require("express");
const {getRubrosHandler} = require('../Handler/rubrosHandler')

const router = Router()

router.get("/", getRubrosHandler)

module.exports = router