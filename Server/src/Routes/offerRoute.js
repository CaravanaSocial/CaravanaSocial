const { Router } = require("express");
const {postOfferHandler, deleteOfferHandler, getOfferHandler, updateOfferHandler, getOfferByIdHandler, getOfferByNameHandler} = require('../Handler/offersHandler')

const router = Router()

router.post("/:id", postOfferHandler);
router.delete("/:id", deleteOfferHandler);
router.get("/", getOfferHandler);
router.patch("/:id", updateOfferHandler);
router.get("/:id", getOfferByIdHandler);
router.get("/by", getOfferByNameHandler);

module.exports = router