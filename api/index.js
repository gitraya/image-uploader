require("dotenv").config();

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const morgan = require("morgan");
const cloudinary = require("./services/cloudinary");
const upload = multer({ dest: "uploads/" });
const app = express();

app.use(morgan("dev"));
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.post("/api/images/cloud", upload.single("image"), async (req, res) => {
  try {
    const image = req.file;
    if (!image) {
      return res
        .status(400)
        .json({ error: "Image is required", status: "FAILED" });
    }

    const { mimetype, originalname, path } = image;
    if (!mimetype.includes("image")) {
      return res
        .status(400)
        .json({ error: "Image type is invalid", status: "FAILED" });
    }

    const uploadedImage = await cloudinary.uploadImage(path, originalname);
    res.status(201).json({ status: "SUCCESS", url: uploadedImage.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error", status: "FAILED" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Service running on port ${PORT}`));
