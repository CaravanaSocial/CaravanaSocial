const { Router } = require('express');
const { uploadImage } = require('../Handler/imageHandler')

const router = Router();

router.post("/upload", uploadImage)

module.exports = router