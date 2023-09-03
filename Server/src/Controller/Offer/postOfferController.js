const { offer } = require("../../db");
const {areaTraining} = require("../../db")
const {Op} = require('sequelize')

const postOfferController = async (info) => {
  const {title, description, category} = info.data
  const {id} = info;

  if (title && description && id) {
    const [user, created] = await offer.findOrCreate({
      where: { title: title },
      defaults: { title:title, description: description},
    });
    if (created) {
      for(let i=0; i<category.length; i++){
        const userCategory = await areaTraining.findOne({where:{name:category[i]}})
        await user.addAreaTraining(userCategory)
      }
      await user.setCompany(id)
      return user;
    } else return created
  } else throw new Error("Info invalida o incorrecta");
};

module.exports = {
    postOfferController
}