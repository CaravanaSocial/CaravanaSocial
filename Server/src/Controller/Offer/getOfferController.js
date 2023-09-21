const { offer, areaTraining, companies, admin} = require("../../db");
const { Op } = require("sequelize");

const getOfferController = async (info) => {
  const { companyName, country, category } = info;

  var filterOptions = [];

  if (companyName) {
    filterOptions.push({
      model: companies,
      where: { nameCompany: { [Op.iLike]: `%${companyName}%` } },
    });
    filterOptions.push({
      model: admin,
      where: { nameCompany: { [Op.iLike]: `%${companyName}%` } },
    })
  } else {
    filterOptions.push({ model: companies })
    filterOptions.push({ model: admin })
  }

  if (country) {
    filterOptions.push({
      model: companies,
      where: { "location.country": country },
    });
    filterOptions.push({
      model: admin,
      where: { "location.country": country },
    })
  }

  if (category) {
    filterOptions.push({ model: areaTraining, where: { name: category } });
  } else {
    filterOptions.push({ model: areaTraining });
  }

  const offerFiltered = await offer.findAll({
    include: filterOptions,
  });

  if (offerFiltered) {
    return offerFiltered;
  } else {
    throw new Error("No hay avisos en la base de datos");
  }
};

module.exports = {
  getOfferController,
};
