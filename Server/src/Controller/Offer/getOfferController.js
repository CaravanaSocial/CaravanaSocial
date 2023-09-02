const { offer, areaTraining, companies } = require("../../db");
const { Op } = require("sequelize");

const getOfferController = async (info) => {
  const { title, companyName, country, category } = info;
  const offerNoFiltered = await offer.findAll({
    include: [{ model: companies }, { model: areaTraining }],
  });
  if (offerNoFiltered) {
    if (country) {
      var countryFilter = offerNoFiltered.filter((ele) => {
        if (ele.company.location.contry === country) {
          return ele;
        }
      });
    } else {
      var countryFilter = offerNoFiltered;
    }
    // if(title){
    //   var titleFilter = countryFilter.filter(ele=>{
    //     if(ele.title.include(title)){
    //       console.log(ele.title)
    //       return ele
    //     }
    //   })
    // }else{
    //   var titleFilter = countryFilter
    // }
  
  } else {
    return res.status(401).json({ message: "no offers found" });
  }
  // if (title) {
  //   console.log(title)
  //   const data = await offer.findAll({where:{title:{[Op.iLike]:`%${title}%`}}})
  //   return data;
  // } else return false;
};

module.exports = {
  getOfferController,
};
