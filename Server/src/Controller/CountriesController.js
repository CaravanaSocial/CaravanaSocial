const countries = require("../Tools/countries.json");
const { country } = require("../db");

const createCountries = async () => {
  const dbInformation = await country.findAll();
  if (dbInformation.length === 0) {
    await country.bulkCreate(countries.countries);
    message =
      "La informacion de los paises fue cargada a la base de datos correctamente";
  } else {
    message = "La informacion de los paises ya fue cargada";
  }

  return message;
};

module.exports = {
  createCountries,
};
