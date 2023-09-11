const { Router } = require("express")
const { postVideoHandler } = require('../Handler/videoHandler')

const router = Router()

router.post("/upVideo", postVideoHandler)



module.exports = router;