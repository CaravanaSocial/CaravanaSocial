const { Router } = require("express");
const {finterCountryHandler} = require('../Handler/filterCountry')

const router = Router()

router.get("/", finterCountryHandler);

module.exports = router