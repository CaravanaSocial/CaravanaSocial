const { CreateState } = require("../Controller/StarterDB/stateController");
const { CreateCities } = require("../Controller/StarterDB/citiesController");
const { createCountries } = require("../Controller/StarterDB/CountriesController");
const {createPrefixes} = require("../Controller/StarterDB/prefixesController")
const {createRubro} = require("../Controller/StarterDB/rubroController")

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
