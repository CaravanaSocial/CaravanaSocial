const { Router } = require("express");
const {postOfferHandler, deleteOfferHandler, getOfferHandler, updateOfferHandler, getOfferByIdHandler} = require('../Handler/offersHandler')

const router = Router()

router.post("/", postOfferHandler);
router.delete("/:id", deleteOfferHandler);
router.get("/", getOfferHandler);
router.patch("/:id", updateOfferHandler);
router.get("/:id", getOfferByIdHandler)

module.exports = router