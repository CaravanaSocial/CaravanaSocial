const cities1 = require("../../Tools/cities.json");
const cities2 = require("../../Tools/cities2.json");
const cities3 = require("../../Tools/cities3.json");
const { city } = require("../../db");

const CreateCities = async () => {
  const dbInformation = await city.findAll();

  try {
    if (dbInformation.length === 0) {
      await city.bulkCreate(cities1.cities);
      await city.bulkCreate(cities2.cities);
      await city.bulkCreate(cities3.cities);
      message = "Se creo la informacion de las ciudades en la base de datos";
    } else {
      message = "La informacion de las ciudades ya fue cargada";
    }
  } catch (error) {
    console.log(error)
  }
  
  return message;
};

module.exports = {
  CreateCities,
};
