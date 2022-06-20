const cloudinary = require("cloudinary").v2;
const path = require("path");
const slug = require("slug");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

module.exports = {
  uploadImage: async function (file, name) {
    return await cloudinary.uploader.upload(file, {
      public_id: slug(path.parse(name).name.normalize("NFKD")),
      folder: `${process.env.CLOUDINARY_FOLDER}/`,
      use_filename: Boolean(name),
      unique_filename: true,
      access_mode: "authenticated",
      resource_type: "image",
      type: "authenticated",
    });
  },
};
