const {offer, companies, areaTraining} = require("../../db")


const getOfferByIdController = async (id) =>{
    const foundOffer = await offer.findOne({
        where:{id},
        include: [{
            model: companies,
            indlude: [{
                model: areaTraining
            }]
        }]
    })

    if(foundOffer) return foundOffer
    throw Error("Offer not found")
}

module.exports={
    getOfferByIdController
}