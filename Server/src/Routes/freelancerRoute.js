const { Router } = require("express");
const {getFreelancerHandler} = require('../Handler/freelancerHandler')

const router = Router()

router.get("/", getFreelancerHandler)

module.exports = router