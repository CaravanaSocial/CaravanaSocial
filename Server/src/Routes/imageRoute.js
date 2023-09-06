const { Router } = require('express');
const { uploadVideosorImage } = require('../Handler/imageHandler')

const router = Router();

router.post("/upload", uploadVideosorImage)

module.exports = router