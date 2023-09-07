
const validateAdminAccount = (req, res, next) =>{
    const {name, email, createKey, password} = req.body
    if(!name) return res.status(404).json({error: "Missing name"})
    if(!email) return res.status(404).json({error: "Missing email"})
    if(!createKey) return res.status(404).json({error: "Missing createKey"})
    if(!password) return res.status(404).json({error: "Missing password"})

    if(typeof(name) !== "string") return res.status(400).json ({error: "Name has to be an string"})
    if(typeof(email) !== "string") return res.status(400).json ({error: "Email has to be an string"})
    if(typeof(createKey) !== "string") return res.status(400).json ({error: "createKey has to be an string"})
    if(typeof(password) !== "string") return res.status(400).json ({error: "Password has to be an string"})

    next()
}

module.exports= {
    validateAdminAccount
}