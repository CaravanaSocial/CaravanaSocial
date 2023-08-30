const {postOfferController, deleteOfferController, getOfferController} = require('../Controller/offersControllers')

const postOfferHandler = async (req, res)=>{
        const data = (req.query)
    try {
        const response = await postOfferController(data)
        if(response){
            return res.status(200).send('Success')
        }else return res.status(404).send('Offer already exist')
    } catch (error) {
        return res.status(500).json(error)
    }
}

const deleteOfferHandler = async (req, res)=>{

    const {id} = req.query
    try {
        const response = await deleteOfferController(id)
        if(response){
            return res.status(200).send('Delete Succesfully')
        }else return res.status(404).send('Offer not found')
    } catch (error) {
        return res.status(500).json(error)
    }
}

const getOfferHandler = async(req, res)=>{
    const {id} = req.query
    try {
        const response = await getOfferController(id)
        if(response){
            return res.status(200).json(response)
        }else return res.status(404).send('Offer not found')
    } catch (error) {
        return res.status(500).json(error)
    }   
}

module.exports = {
    postOfferHandler,
    deleteOfferHandler,
    getOfferHandler
}