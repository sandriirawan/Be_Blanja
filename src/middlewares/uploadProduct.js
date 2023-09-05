const multer = require("multer");
const { failed } = require("../helper/common");
// manajemen file
const multerUpload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    const fileSize = parseInt(req.headers["content-length"]);
    const maxSize = 2 * 1024 * 1024;
    if (fileSize > maxSize) {
      const error = {
        message: "File size exceeds 2 MB",
      };
      return cb(error, false);
    }
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, true);
    } else {
      const error = {
        message: "file must be jpeg,jpg or png",
      };
      cb(error, false);
    }
  },
});

// middleware
const uploadProduct = (req, res, next) => {
  const multerSingle = multerUpload.single("photo_product");
  multerSingle(req, res, (err) => {
    if (err) {
      res.status(500).send("Kesalahan Unggah Berkas: " + err.message);
    } else {
      next();
    }
  });
};



module.exports = uploadProduct;
