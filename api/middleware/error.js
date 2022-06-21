const multer = require("multer");

module.exports.errorHandler = (err, req, res, next) => {
  console.error(err.message);

  if (err.message === "NotFound") {
    return res.status(404).end();
  }

  if (err.message === "ImageNull") {
    return res
      .status(400)
      .json({ error: "Image is required", status: "FAILED" });
  }

  if (err.message === "ImageType") {
    return res
      .status(400)
      .json({ error: "Image type is invalid", status: "FAILED" });
  }

  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message, status: "FAILED" });
  }

  if (err) {
    return res
      .status(500)
      .json({ error: "Internal server error", status: "FAILED" });
  }

  next(err);
};
