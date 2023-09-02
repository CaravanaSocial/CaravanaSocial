const {areaTraining} = require("../../db")

const getRubrosController = async () =>{
    const rubros = await areaTraining.findAll()
    if(rubros.length >0){
        const rubrosArray = rubros.map(x=>x.name)
        return rubrosArray
    }
    throw Error("There is no categories")
}

module.exports = {
    getRubrosController
}