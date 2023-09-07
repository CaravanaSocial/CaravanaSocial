const { getRubrosController } = require("../Controller/Rubros/getRubrosController")

const getRubrosHandler = async (req, res) =>{
    try {
        const rubros = await getRubrosController()
        res.status(200).json(rubros)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports={
    getRubrosHandler
}