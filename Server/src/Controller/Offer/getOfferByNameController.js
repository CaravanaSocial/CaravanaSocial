

const getOfferByNameController = async (name) => {
    try {
        const findOfferByName = await training.findAll({
            where:{
                name:{
                    [Op.iLike]: `${name}%`
                }
            }
        })
    
        return findOfferByName
    } catch (error) {
        throw error
    }
}  

module.exports = {
    getOfferByNameController
}