const { success } = require("../../db");
const { uploadImage } = require("../../Tools/imageCloudinary");

const createSuccSto = async (body) => {
  const { name, image, history, webpage, fb, ig } = body;
  if (!name || !image || !history)
    throw new Error("Falta informacion necesaria");
  // const realImage = uploadImage(image)

  try {
    const created = await success.create(body);

    return created;
  } catch (error) {
    throw new Error("Los links de las redes sociales deben ser validos");
  }
};

module.exports = {
  createSuccSto,
};
