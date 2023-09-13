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
      facebook: facebook ? facebook : foundStory.facebook,
      linkedin: linkedin ? linkedin : foundStory.linkedin,
      instagram : instagram ? instagram : foundStory.instagram,
      twitter : twitter ? twitter : foundStory.twitter
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
