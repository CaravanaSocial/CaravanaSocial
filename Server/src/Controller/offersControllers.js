const { offer } = require("../db");

const postOfferController = async (data) => {
  const { title, description} = data;
  console.log("Estoy en controller", title);
  if (title && description) {
    const [user, created] = await offer.findOrCreate({
      where: { title: title },
      defaults: { title:title, description: description},
    });
    console.log(created)
    if (created) {
      return created;
    } else return created
  } else throw new Error("Info invalida o incorrecta");
};

const deleteOfferController = async (id) => {
  console.log('Estoy en controller', id);
  if (id) {
    const data =  await offer.destroy({where:{id:id}})
    console.log('info data',data)
    return true;
  } else return false;
};

const getOfferController = async (id) => {
  console.log(id);
  if (id) {
    const data = await offer.findOne({where:{id:id}})
    console.log(data)
    return data;
  } else return false;
};

const updateOfferController = async(data)=>{
  console.log('Estoy en Controller')
  const {id, title, description} = data
  if(id){
    // console.log(title)
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
