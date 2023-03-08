const multer = require("multer");
// Define a disk storage object for storing uploaded files
const storage = multer.diskStorage({
    // Set the destination directory for uploaded files
    destination: function (req, file, cb) {
      cb(null, "./public/assets");
    },
    // Set the filename of the uploaded file to its original name
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  
  // Create an instance of the multer middleware using the disk storage object
  const upload = multer({ storage });
  
  // Export the multer middleware instance for use in other files
  module.exports = upload;
  