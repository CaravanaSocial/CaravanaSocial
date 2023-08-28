const {Router} = require("express");

const router = Router()

router.get("/hola",(req,res)=>{
    res.send("FUNCIONA")
})

router.get("/prueba",(req,res)=>{
    res.send("PRUEBAA")
})

module.exports = router;