const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

exports.uploadImg = async (image, name) => {
  const img = await cloudinary.uploader.upload(image, {
    public_id: name,
  });
  return img.secure_url;
};
