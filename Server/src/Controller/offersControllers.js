const { offer } = require("../db");

const postOfferController = async (data) => {
  const { title, description, image } = data;
  console.log("Estoy en controller", title);
  if (title && description && image) {
    const [user, created] = await offer.findOrCreate({
      where: { title: title },
      defaults: { title:title, description: description, image: image },
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

module.exports = {
  postOfferController,
  deleteOfferController,
  getOfferController,
};
