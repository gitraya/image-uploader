const multer = require("multer");
const path = require("path");
const slug = require("slug");

const storage = multer.diskStorage({
  destination: `${process.env.STORAGE_FOLDER}/`,
  filename: (req, file, callback) =>
    callback(
      null,
      slug(path.parse(file.originalname).name.normalize("NFKD"), {
        lower: true,
      }) +
        "-" +
        Date.now()
    ),
});

module.exports.upload = multer({ storage });
