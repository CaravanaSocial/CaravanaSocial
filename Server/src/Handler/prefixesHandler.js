const {createPrefixes, getPrefixesController} = require('../Controller/prefixesController')

/* const prefixesHandler = async()=>{
    try {
        await createPrefixes()
        console.log('Prefixes Done!')
    } catch (error) {
        console.log('Error al cargar prefixes');
    }
} */

const getPrefixesHandler = async (req, res) =>{
    try {
        const prefixes = await getPrefixesController()
        res.status(200).json(prefixes)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}



module.exports = {
    /* prefixesHandler, */
    getPrefixesHandler,
}