const {country} = require("../../db");

const filterGetallCountries = async () => {
  const response = await country.findAll({ attributes: ["name"] });
  const newResponse = response.map((name) => name.name);

  return newResponse;
};

module.exports = {
    filterGetallCountries
};