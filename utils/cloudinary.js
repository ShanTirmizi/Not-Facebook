/* eslint-disable no-undef */
const cloudinary = require('cloudinary').v2;
// import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export function uploadImage(imageUploaded) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      imageUploaded,
      { width: 400, height: 300, crop: 'fill' },
      (err, res) => {
        if (err) reject(err);
        resolve(res);
      }
    );
  });
}

module.exports = cloudinary;
