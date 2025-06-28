const multer = require('multer');
const path = require('path');

// File filter for JPG/PNG
const imageFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
    cb(null, true);
  } else {
    cb(new Error('Only JPG and PNG images are allowed.'), false);
  }
};

// Storage for profile images
const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profiles');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Storage for blog images
const blogStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/blogs');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const uploadProfile = multer({ 
  storage: profileStorage, 
  fileFilter: imageFilter,
  limits: { fileSize: MAX_FILE_SIZE }
});
const uploadBlog = multer({ 
  storage: blogStorage, 
  fileFilter: imageFilter,
  limits: { fileSize: MAX_FILE_SIZE }
});

module.exports = {
  uploadProfile,
  uploadBlog
};
