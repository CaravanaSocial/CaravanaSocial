const {Router} = require("express");
const { _router } = require("../app");

const router = Router()

router.get("/hola",(req,res)=>{
    res.send("FUNCIONA")
})

module.exports = router;