const { Router } = require("express");
const { trainingHandler } = require('../Handler/createTrainingHandler')
const { getTrainingByName } = require('../Handler/getTrainingHandler')
const { getAlltraining } = require('../Handler/getAllTraining')



const router = Router();

router.get('/training', (req, res) => {
    const { name } = req.body;
    if(!name){
        getAlltraining(req, res);
    }else{
        getTrainingByName(req, res)
    }
})

router.post('/training/create', (req, res) => {
    trainingHandler(req, res)
})

module.exports = router;
