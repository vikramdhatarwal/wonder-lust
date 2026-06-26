if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const cloudinaryUrl = process.env.CLOUDINARY_URL;
const hasPlaceholder = (value) => value && /<your_|your_api_key|your_api_secret|placeholder/i.test(value);

if (
  hasPlaceholder(cloudinaryUrl) ||
  hasPlaceholder(process.env.CLOUD_NAME) ||
  hasPlaceholder(process.env.CLOUDINARY_API_KEY) ||
  hasPlaceholder(process.env.CLOUDINARY_API_SECRET)
) {
  throw new Error("Replace the placeholder Cloudinary credentials in .env with your real Cloudinary values.");
}

const cloudinaryConfig = cloudinaryUrl ? {
    cloudinary_url: cloudinaryUrl
} : {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
};

cloudinary.config(cloudinaryConfig);


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'wanderlust_DEV',
    allow_formats: ['jpeg', 'png', 'jpg'],
  
  },
});

module.exports = {
  cloudinary,
  storage
};
