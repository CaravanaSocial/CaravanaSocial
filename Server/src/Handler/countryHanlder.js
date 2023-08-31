const { CreateState } = require("../Controller/stateController");
const { CreateCities } = require("../Controller/citiesController");
const { createCountries } = require("../Controller/CountriesController");
const {createPrefixes} = require("../Controller/prefixesController")
const {createRubro} = require("../Controller/rubroController")

const CreateData = async () => {
  try {
    await CreateState();
    await CreateCities();
    await createCountries();
    await createPrefixes();
    //TEMPORAL
    await createRubro()
    //---------------------
    console.log(
      "la informacion de las las ciudades fue cargada correctamente a la base de datos"
    );
  } catch (error) {
    console.error("Error al cargar la información:", error.message);
  }
};

module.exports = {
  CreateData,
};
