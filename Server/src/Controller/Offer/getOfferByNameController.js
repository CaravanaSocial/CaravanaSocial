const { Op } = require("sequelize");
const { offer } = require("../../db");

const getOfferByNameController = async (name) => {
  try {
    const findOfferByName = await offer.findAll({
      where: {
        title: {
          [Op.iLike]: `${name}%`,
        },
      },
    });

    return findOfferByName;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getOfferByNameController,
};
