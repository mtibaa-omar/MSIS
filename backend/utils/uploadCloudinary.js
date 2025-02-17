import { v2 as cloudinary } from "cloudinary";
import catchAsync from "./catchAsync.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

const uploadImagesToCloudinary = async (images) => {
  console.log("Images Received for Upload:", images);

  if (!images || images.length === 0) {
    throw new Error("You must upload between 1 and 3 images.");
  }

  const uploadPromises = images.map(async (image) => {
    const buffer = image?.buffer || Buffer.from(await image.arrayBuffer());

    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "MSIS" }, (error, uploadResult) => {
          if (error) return reject(error);

          resolve(uploadResult.secure_url);
        })
        .end(buffer);
    });
  });

  const uploadedImages = await Promise.all(uploadPromises);

  return uploadedImages;
};

export default uploadImagesToCloudinary;
