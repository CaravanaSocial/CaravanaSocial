const { success } = require("../../db");

const changeStory = async (name, image, testimony, facebook, linkedin, instagram, twitter, id) => {
  try {
    
    if (!id)
      throw new Error("Falta el id de la historia de exito");

    const foundStory = await success.findByPk(id);

    if (!foundStory) throw error;

    const newStory = {
      name: name ? name : foundStory.name,
      image: image ? image : foundStory.image,
      testimony: testimony ? testimony : foundStory.testimony,
      socialMedia: socialMedia ? socialMedia :foundStory.socialMedia
    };
    await foundStory.update(newStory);

    return newStory;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  changeStory,
};
