const { country, state, city, prefix } = require("../db");

const filterCountryController = async (name) => {
  const responseCountry = await country.findOne({ where: { name: name } });
  const responsePrefix = await prefix.findOne({where:{name:name}})

  if (responseCountry === null) {
    const responseCity = await city.findOne({ where: { name: name } });

    const responseCityID = responseCity.dataValues.id_state;
    const allCities = await city.findAll({
      where: { id_state: responseCityID },
    });

    const allCityname = allCities.map((city) => city.dataValues.name);
    return allCityname;
  } else {
    const countryId = responseCountry.dataValues.id;

    const responseState = await state.findAll({
      where: { id_country: countryId },
    });
    const prefixCountry = await prefix.findOne({where:{name:name}})
    const code = prefixCountry.dataValues.code

    const stateName = responseState.map((state) => state.name);
    return ({stateName, code});
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
