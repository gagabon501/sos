const express = require("express");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

require("dotenv").config();

// Create mongo connection
const DB_URI =
  process.env.NODE_ENV == "development"
    ? "mongodb://127.0.0.1:27017"
    : process.env.MONGO_URI;

// Create storage engine
const storage = new GridFsStorage({
  url: DB_URI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg", "image/jpg", "image/bmp"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-sos-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: "docs",
      filename: `${Date.now()}-sos-${file.originalname}`,
    };
  },
});
const upload = multer({ storage });

const {
  getObservations,
  getObservation,
  createObservation,
  deleteObservation,
  updateObservation,
  showImage,
} = require("../controllers/sosController");

const router = express.Router();

// GET all observations
router.get("/allobservations", getObservations);

// GET a single observation
router.get("/:id", getObservation);

// POST a new observation
router.post("/", upload.single("file"), createObservation);

// router.post("/", multer.single("file"), createObservation);

// DELETE a observation
router.delete("/:id", deleteObservation);

// UPDATE a observation
router.patch("/:id", updateObservation);

router.get("/image/:filename", showImage);

module.exports = router;
