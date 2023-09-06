const cloudinary = require("cloudinary").v2;

const cloud_name = process.env.CLOUD_NAME;
const api_key = process.env.API_KEY;
const api_secret = process.env.API_SECRET;

console.log(cloud_name);
console.log(api_key);
console.log(api_secret);


cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret,
});

const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};

const uploadImage = async (image) => {
  try {
    console.log(image);
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(image, opts, (error, result) => {
        if (result && result.secure_url) {
          console.log(result.secure_url);
          resolve(result.secure_url);
        } else {
          console.log(error.message);
          throw new Error("Failed to upload image.");
        }
      });
    });
  } catch (error) {
    throw error
  }
};

// const uploadVideosorImage = async (file) => {
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.upload(file, opts, (error, result) => {
//       if (result && (result.secure_url || result.url)) {
//         console.log(result.secure_url || result.url);
//         resolve(result.secure_url || result.url);
//       } else {
//         console.log(error.message || "Failed to upload file.");
//         reject(new Error("Failed to upload file."));
//       }
//     });
//   });
// };

module.exports = {
  uploadImage
};

