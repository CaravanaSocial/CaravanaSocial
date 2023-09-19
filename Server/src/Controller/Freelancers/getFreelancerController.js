const { where } = require("sequelize");
const {Op} = require("sequelize")
const { user, areaTraining } = require("../../db");

const getFreelancerController = async (info) => {
  const { country, category } = info;

  const whereClause = {
    freelancer: true,
  };

  if (country) {
    whereClause["location.country"] = country;
  }

  const includeOption = {
    model: areaTraining,
  };

  if (category) {
    includeOption.where = { name: category };
  }

  const freelancerFiltered = await user.findAll({
    where: whereClause,
    include: [includeOption],
  });

  return freelancerFiltered;
};

module.exports = {
  getFreelancerController,
};
