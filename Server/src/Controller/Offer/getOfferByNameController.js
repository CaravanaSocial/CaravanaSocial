const { Op } = require("sequelize");
const { offer } = require("../../db");

const getOfferByNameController = async (name) => {
  try {
    const findOfferByName = await offer.findAll({
      include: [
        {
          model: companies,
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: areaTraining,
              attributes: ["name"],
  
              through: { attributes: [] },
            },
          ],
        },
        {
          model: admin,
        },
        {
          model: areaTraining,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
      
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
