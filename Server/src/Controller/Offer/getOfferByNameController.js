const { Op } = require("sequelize");
const { offer, companies, areaTraining, admin } = require("../../db");

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
    console.log(findOfferByName);

    if (findOfferByName.length > 0) {
      return findOfferByName;
    }
    return [];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getOfferByNameController,
};
