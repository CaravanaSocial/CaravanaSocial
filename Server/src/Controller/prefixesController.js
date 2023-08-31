const Prefixes = require('../Tools/Prefixes.json')
const {prefix} = require('../db')

const createPrefixes = async()=>{
    const dbInformation = await prefix.findAll()
    if(dbInformation.length===0){
    await prefix.bulkCreate(Prefixes.name)
    message =
      "La informacion de los prefijos fue cargada a la base de datos correctamente";
    }else{
        message = "La informacion de los prefijos ya fue cargada";
    }
}

module.exports = {
    createPrefixes
}