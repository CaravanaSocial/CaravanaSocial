const { offer, areaTraining, companies } = require("../../db");
const { Op } = require("sequelize");

const getOfferController = async (info) => {
  const { companyName, country, category } = info;

  var filterOptions = []

  if(companyName){
    filterOptions.push({model:companies, where:{nameCompany:companyName}})
  }else{
    filterOptions.push({model:companies})
  }
  
  if (country) {
    filterOptions.push({ model: companies, where: { 'location.contry': country } });
  }
  
  if(category){
    filterOptions.push({model:areaTraining, where:{name:category}})
  }else{
    filterOptions.push({model:areaTraining});
  }


  const offerFiltered = await offer.findAll({
    include: filterOptions,
  });

  if (offerFiltered) {
    return offerFiltered;
}else{
  throw new Error('No hay avisos en la base de datos')
}
}

module.exports = {
  getOfferController,
};
