const { Router } = require("express");
const{ trainingHandler } = require('../Handler/createTrainingHandler')
// const {getUser} = require('../Handler/userHandlers')


const router = Router();

router.post('/training/create', (req, res) => {
    trainingHandler(req, res)
})

module.exports = router;
