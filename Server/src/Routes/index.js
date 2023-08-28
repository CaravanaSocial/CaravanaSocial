const {Router} = require("express");

const router = Router()

router.get("/hola",(req,res)=>{
    res.send("FUNCIONA")
})

module.exports = router;