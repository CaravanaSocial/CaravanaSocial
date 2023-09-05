const { user, areaTraining } = require("../../db");

const getFreelancerController = async (info) => {
  const { country, category } = info;

  const filterOption = {}

  if (country) {
    filterOption["where"]={ [Op.and]:[{"location.country": country},{freelancer:true}] }
  }else{
    filterOption['where']={freelancer:true}
  }

  if(category){
    filterOption['include']={ model: areaTraining, where: { name: category } }
  }

  

  const freelancerFiltered = await user.findAll(filterOption);

  console.log(Array.isArray(freelancerFiltered))
  return freelancerFiltered;
};

module.exports = {
  getFreelancerController,
};
