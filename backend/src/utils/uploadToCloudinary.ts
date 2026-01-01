import cloudinary from "../config/cloudinary";
import streamifier from "streamifier";
import { UploadApiResponse } from "cloudinary";

export const uploadToCloudinary = (
  file: Express.Multer.File
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "informate" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result as UploadApiResponse);
      }
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};
