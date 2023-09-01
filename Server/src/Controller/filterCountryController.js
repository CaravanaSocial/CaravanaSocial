const { country, state, city, prefix } = require("../db");

const filterCountryController = async (name) => {
  //*************************solo name country ********************************/

  if (Number(name)) {
    const responseCity = await city.findAll({ where: { id_state: name } });

    const allCities = responseCity.map((city) => city.dataValues.name);
    return allCities;
  } else {
    const responseCountry = await country.findOne({ where: { name: name } });

    const countryId = responseCountry.dataValues.id;
    const responseState = await state.findAll({
      where: { id_country: countryId },
    });

    const allStates = responseState.map((state) => state.dataValues);
    console.log(allStates);
    const prefixCountry = await prefix.findOne({ where: { name: name } });
    const code = prefixCountry.dataValues.code;
    console.log("holahola", { allStates, code });
    return { allStates, code };
  }
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
