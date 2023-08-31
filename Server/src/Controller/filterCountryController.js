const { country, state } = require("../db");

const filterCountryController = async (name) => {
  const responseCountry = await country.findOne({ where: { name: name } });

  const countryId = responseCountry.dataValues.id;

  const responseState = await state.findAll({
    where: { id_country: countryId },
  });

  return responseState;
};

const filterGetallCountries = async () => {
  const response = await country.findAll({ attributes: ["name"] });
  const newResponse = response.map((name) => name.name);

  return newResponse;
};

module.exports = {
  filterCountryController,
  filterGetallCountries,
};
