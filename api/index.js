require("dotenv").config();

const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const mime = require("mime-types");
const cloudinary = require("./services/cloudinary");
const { upload } = require("./services/storage");
const { errorHandler } = require("./middleware/error");

const app = express();

app.use(morgan("dev"));
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "build")));

app.get("/api/images/:publicId", (req, res, next) => {
  const image = path.resolve(__dirname, `uploads/${req.params.publicId}`);

  if (!fs.existsSync(image)) return next(new Error("NotFound"));

  const mimetype = mime.lookup(image);
  res.setHeader("Content-Type", mimetype);
  res.sendFile(image);
});

app.post("/api/images", upload.single("image"), (req, res, next) => {
  const image = req.file;

  if (!image) return next(new Error("ImageNull"));
  if (!image.mimetype.includes("image")) return next(new Error("ImageType"));

  res
    .status(201)
    .json({ status: "SUCCESS", url: `/api/images/${image.filename}` });
});

app.post(
  "/api/images/cloud",
  upload.single("image"),
  async (req, res, next) => {
    try {
      const image = req.file;

      if (!image) return next(new Error("ImageNull"));
      if (!image.mimetype.includes("image")) {
        return next(new Error("ImageType"));
      }

      const { originalname, path } = image;
      const uploadedImage = await cloudinary.uploadImage(path, originalname);

      res
        .status(201)
        .json({ status: "SUCCESS", url: uploadedImage.secure_url });
    } catch (error) {
      next(error);
    }
  }
);

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Service running on port ${PORT}`));
