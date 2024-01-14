import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    //Upload file on cloduinary
    const res = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    //File uploaded successfully

    console.log("File is uploaded on cloduianary", res.url);
    return res;
  } catch (err) {
    //If file is not uploaded, we will remove the temp file
    fs.unlinkSync(localFilePath);
    return null;
  }
};
