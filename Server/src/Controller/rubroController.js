const rubro = require("../Tools/rubros.json")
const {areaTraining} = require("../db")

const createRubro = async ()=>{
console.log("rubroController")
    const dbInformation = await areaTraining.findAll()
    if(dbInformation.length===0){
        await areaTraining.bulkCreate(rubro.rubros)
        message =
            "La informacion de los prefijos fue cargada a la base de datos correctamente";
    }else{
        message = 
            "La informacion de los prefijos ya fue cargada";
    }
}

const getRubrosController = async () =>{
    const rubros = await areaTraining.findAll()
    if(rubros.length >0){
        const rubrosArray = rubros.map(x=>x.name)
        return rubrosArray
    }
    throw Error("There is no categories")
}

module.exports = {
    createRubro,
    getRubrosController
}