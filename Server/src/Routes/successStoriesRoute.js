const { Router } = require("express");
const {createSuccessStories, getAllSuccessStories, updateSuccessStories, deleteSuccessStories } = require('../Handler/successHandler')

const router = Router()

router.post("/create", createSuccessStories)
router.get("/",getAllSuccessStories)
router.patch("/update/:id", updateSuccessStories)
router.delete("/delete/:id", deleteSuccessStories)

module.exports = router