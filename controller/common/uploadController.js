// controllers/uploadController.js
const path = require('path');
const { 
  AdminAuthDal, 
} = require("../../DAL");

const uploadFileHandler = (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No file uploaded',
    });
  }

  
  const filePath = `${req.file.filename}`;
  const _id = req.admin._id;
  AdminAuthDal.UpdateAdminProfile({_id},{profile_image:req.file.filename})
  return res.status(200).json({
    success: true,
    message: 'File uploaded successfully',
    filename: req.file.filename,
    path: filePath,
  });
};

module.exports = {
  uploadFileHandler,
};
