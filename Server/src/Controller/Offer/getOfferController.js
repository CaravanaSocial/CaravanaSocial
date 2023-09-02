const { offer } = require("../../db");
const {Op} = require('sequelize')

const getOfferController = async (title) => {
  if (title) {
    console.log(title)
    const data = await offer.findAll({where:{title:{[Op.iLike]:`%${title}%`}}})
    return data;
  } else return false;
};

module.exports = {
    getOfferController
}