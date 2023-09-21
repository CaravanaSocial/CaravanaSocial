const { Op } = require("sequelize");
const { training, companies, areaTraining, admin } = require("../../db");
// const { getAll } = require("../Trainings/getAll");

const filterTrain = async (info) => {
  const { country, category } = info;

  const filterOptions = [{ model: companies }, { model: admin }];

  try {
    if (country) {
      filterOptions.push({
        model: companies,
        where: { "location.country": country },
      });
    }

    if (category) {
      filterOptions.push({ model: areaTraining, where: { name: category } });
    } else {
      filterOptions.push({ model: areaTraining });
    }

    const offerFiltered = await training.findAll({
      include: filterOptions,
    });

    if (offerFiltered) {
      return offerFiltered;
    } else {
      throw new Error("No hay capacitaciones en la base de datos");
    }
  } catch (error) {}
};

module.exports = {
  filterTrain,
};
