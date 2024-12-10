const dotenv = require('dotenv');
dotenv.config();
const { v2 } = require('cloudinary');

v2.config({
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  cloud_name: process.env.CLOUD_NAME,
});

exports.uploadProfile = async (path) => {
  try {
    const profileRes = await v2.uploader.upload(path, {
      resource_type: 'auto',
      transformation: [
        {
          width: 500,
          height: 500,
          crop: 'thumb',
          gravity: 'center',
          format: 'jpg',
          quality: 'auto',
        },
      ],
    });
    return profileRes;
  } catch (e) {
    throw new Error(e);
  }
};

exports.uploadMedia = async (path) => {
  try {
    const profileRes = await v2.uploader.upload(path, {
      resource_type: 'auto',
    });
    return profileRes;
  } catch (e) {
    throw new Error(e);
  }
};

exports.deleteMediaFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteVideoFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: 'video' });
  } catch (error) {
    console.log(error);
  }
};
