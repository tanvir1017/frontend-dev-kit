import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { StatusCodes } from "http-status-codes";
import path from "path";
import { env } from "process";
import AppError from "../../errors/appError";
cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});
const sendImgToCloudinary = async (
  imagePath: string,
  imageName: string,
  subFolderName?: string,
) => {
  // Upload an image
  try {
    const uploadResult = await cloudinary.uploader.upload(imagePath, {
      upload_preset: "dan_ange", // Ensure you're using the correct preset
      public_id: imageName,
      folder: `image`,
    });

    fs.unlink(imagePath, function (error) {
      if (error) {
        console.log("🔗 file system unlink ~ error:", error);
        throw new AppError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          `Something went wrong! ${error.message}`,
        );
      } else {
        console.log(
          `File is deleted from ${path.join(process.cwd() + ` 📂 /public/uploads/${subFolderName}`)} 🗑️`,
        );
      }
    });
    return uploadResult;
  } catch (error: any) {
    console.log("🚀 ~ error ~ from cloudinary catch:", error.message);

    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      `Something went wrong regarding with the image uploading system ${error.message}`,
    );
  }
};

export default sendImgToCloudinary;
