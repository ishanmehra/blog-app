const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// File filter for JPG/PNG
const imageFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
    cb(null, true);
  } else {
    cb(new Error('Only JPG and PNG images are allowed.'), false);
  }
};

// Memory storage for temporary file handling
const memoryStorage = multer.memoryStorage();

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const uploadProfile = multer({ 
  storage: memoryStorage, 
  fileFilter: imageFilter,
  limits: { fileSize: MAX_FILE_SIZE }
});

const uploadBlog = multer({ 
  storage: memoryStorage, 
  fileFilter: imageFilter,
  limits: { fileSize: MAX_FILE_SIZE }
});

// Helper function to upload to Cloudinary
const uploadToCloudinary = async (file, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: 'auto'
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    
    stream.end(file.buffer);
  });
};

module.exports = {
  uploadProfile,
  uploadBlog,
  uploadToCloudinary
};
