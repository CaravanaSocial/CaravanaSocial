const { Router } = require("express");
const { postCommentsHandler, getCommentsHandler, deleteCommentsHandler} = require('../Handler/comentHandler')


const router = Router()

router.post("/create/:id", postCommentsHandler)
router.get("/", getCommentsHandler)
router.delete("/delete/:id", deleteCommentsHandler)

module.exports = router