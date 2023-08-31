const { offer } = require("../db");
const {Op} = require('sequelize')

const postOfferController = async (data) => {
  const { title, description} = data;
  if (title && description) {
    const [user, created] = await offer.findOrCreate({
      where: { title: title },
      defaults: { title:title, description: description},
    });
    if (created) {
      return created;
    } else return created
  } else throw new Error("Info invalida o incorrecta");
};

const deleteOfferController = async (id) => {
  if (id) {
    const data =  await offer.destroy({where:{id:id}})
    console.log('info data',data)
    return true;
  } else return false;
};

const getOfferController = async (title) => {
  console.log(title)
  if (title) {
    const data = await offer.findAll({where:{title:{[Op.iLike]:`%${title}%`}}})
    console.log(data)
    return data;
  } else return false;
};

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
  postOfferController,
  deleteOfferController,
  getOfferController,
  updateOfferController
};
