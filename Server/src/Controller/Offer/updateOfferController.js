const { offer } = require("../../db");

const updateOfferController = async(data)=>{
  const {id, title, description} = data
  if(id){
    await offer.update({title:title, description: description},{where :{id:id}})
    const info = await offer.findByPk(id)
    if(info){
      return info
    }else throw new Error("No se encontraron Offers")
  }else throw new Error("Id invalida o incorrecta")
}

module.exports = {
    updateOfferController
}