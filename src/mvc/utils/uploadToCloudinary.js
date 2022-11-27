import dotenv from "dotenv";
dotenv.config();

import cloudinary from "cloudinary";

const uploadToCloudinary = async (resource, type, resourceId) => {
  return new Promise(async (resolve, reject) => {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    try {
      if (resourceId) {
        await cloudinary.v2.uploader.destroy(resourceId);
      }
      // if image is actual file
      const uploadedResponse = await cloudinary.v2.uploader.upload(resource, {
        resource_type: type ? type : "image",
        folder: "titanium",
        crop: "scale",
        quality: "auto",
      });
      resolve(uploadedResponse);
    } catch (err) {
      reject(err);
    }
  });
};

export { uploadToCloudinary };
