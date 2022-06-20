require("dotenv").config();

const express = require("express");
const fs = require("fs");
const cors = require("cors");
const morgan = require("morgan");
const cloudinary = require("./services/cloudinary");
const { upload } = require("./services/storage");
const app = express();

app.use(morgan("dev"));
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/images/:publicId", (req, res) => {
  const image = `${__dirname}/uploads/${req.params.publicId}`;

  if (!fs.existsSync(image)) return res.status(404).end();

  res.sendFile(image);
});

app.post("/api/images", upload.single("image"), (req, res) => {
  const image = req.file;

  if (!image) {
    return res
      .status(400)
      .json({ error: "Image is required", status: "FAILED" });
  }

  if (!image.mimetype.includes("image")) {
    return res
      .status(400)
      .json({ error: "Image type is invalid", status: "FAILED" });
  }

  res
    .status(201)
    .json({ status: "SUCCESS", url: `/api/images/${image.filename}` });
});

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
