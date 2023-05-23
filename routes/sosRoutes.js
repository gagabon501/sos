const express = require("express");

const mongoose = require("mongoose");
const fs = require("fs");
const sharp = require("sharp");

const multer = require("multer");

require("dotenv").config();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
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

//middleware to reduce image size using 'sharp' before saving to mongoDB database
const savePhotoDb = async (req, res, next) => {
  const gridFSBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    chunkSizeBytes: 1024,
    bucketName: "sosdocs",
  });

  // shrink image before uploading to MongoDb --> 23-May-23
  const fname_hs = "public/images/sos-" + req.file.filename;
  try {
    await sharp(req.file.path, { failOnError: false })
      .resize(600, 600, {
        fit: sharp.fit.inside,
        withoutEnlargement: true, // if image's original width or height is less than specified width and height, sharp will do nothing(i.e no enlargement)
      })
      .toFile(fname_hs);
  } catch (error) {
    throw error;
  }

  //now, save to mongoDB database the photo
  fs.createReadStream(fname_hs)
    .pipe(gridFSBucket.openUploadStream(fname_hs.slice(14))) //up to the filename part ('sos-req.file.filename')
    .on("error", () => {
      console.log("Some error occured:" + error);
      res.send(error);
    })
    .on("finish", () => {
      console.log("done saving to mongoDB");
      next();
    });
};

// POST a new observation
router.post("/", upload.single("file"), savePhotoDb, createObservation);

// DELETE a observation
router.delete("/:id", deleteObservation);

// UPDATE a observation
router.patch("/:id", updateObservation);

router.get("/image/:filename", showImage);

module.exports = router;
