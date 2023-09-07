const { Router } = require("express");
const {userToTrainingHandler, usersByTrainingHandler, trainingsByUserHandler} = require('../Handler/user_trainingHandler')

const router = Router()

//-------Vincular usuario y capacitacion
router.post("/adduser", userToTrainingHandler)

//-------Usuarios en una capacitacion // id de la capacitacion
router.get("/usersByTraining/:id", usersByTrainingHandler)

//-------Capacitaciones de un usuario // id del usuario
router.get("/trainingsByUser/:id", trainingsByUserHandler)

module.exports = router