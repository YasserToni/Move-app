const multer = require("multer");

exports.multerSingleImage = (storage, fieldName) => {
  return multer({ storage: storage }).fields([
    { name: `${fieldName}`, maxCount: 1 },
  ]);
};
