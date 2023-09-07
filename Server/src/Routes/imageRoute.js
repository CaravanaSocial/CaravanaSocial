const { Router } = require('express');
const { uploadImageHandler } = require('../Handler/uploadImageHandler')

const router = Router();

router.post("/upload", uploadImageHandler)

module.exports = router