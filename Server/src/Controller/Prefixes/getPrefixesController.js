const {prefix} = require('../../db')

const getPrefixesController = async () =>{
    const prefixes = await prefix.findAll()
    if(prefixes.length>0) return prefixes
    throw Error("There is no prefixes")
}

module.exports = {
    getPrefixesController
}