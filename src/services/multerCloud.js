import multer from 'multer';
import path from 'path';
import { allowedExtensions } from '../utilities/allowedEtentions.js'

export const multerCloudFunction = (allowedExtensionsArr = allowedExtensions.Image) => {
  // Set up storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Define where to store uploaded files
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${Date.now()}${ext}`); // Generate unique filename
    }
  });

  // File filter
  const fileFilter = (req, file, cb) => {
    if (allowedExtensionsArr.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  };

  // Configure multer
  const fileUpload = multer({
    storage,
    fileFilter
  });

  return fileUpload;
};