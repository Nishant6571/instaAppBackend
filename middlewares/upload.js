const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, res, cb) {
    cb(null, Date.now() + "-" + this.file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = { upload };
