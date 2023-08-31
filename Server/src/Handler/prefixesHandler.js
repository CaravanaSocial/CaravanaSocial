const {createPrefixes} = require('../Controller/prefixesController')

const prefixesHandler = async()=>{
    try {
        await createPrefixes()
        console.log('Prefixes Done!')
    } catch (error) {
        console.log('Error al cargar prefixes');
    }
}

module.exports = {
    prefixesHandler
}