const { Router } = require("express");
const {postOfferHandler, deleteOfferHandler, getOfferHandler, updateOfferHandler} = require('../Handler/offersHandler')

const router = Router()

router.post("/", postOfferHandler);
router.delete("/:id", deleteOfferHandler);
router.get("/", getOfferHandler);
router.patch("/:id", updateOfferHandler);

module.exports = router