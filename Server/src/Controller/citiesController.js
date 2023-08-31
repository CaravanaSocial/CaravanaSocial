const cities = require("../Tools/cities.json");
const { city } = require("../db");

const CreateCities = async () => {
  const dbInformation = await city.findAll();
  if (dbInformation.length === 0) {
    await city.bulkCreate(cities.cities);
    message = "Se creo la informacion de las ciudades en la base de datos";
  } else {
    message = "La informacion de las ciudades ya fue cargada";
  }
  return message;
};

module.exports = {
  CreateCities,
};
