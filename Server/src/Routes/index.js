const { Router } = require("express");
const { getAccessApi } = require("../Controller/CountriesController");

const router = Router();

router.get("/countries", getAccessApi);

module.exports = router;
