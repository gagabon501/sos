const express = require("express");

const mongoose = require("mongoose");
const fs = require("fs");
const sharp = require("sharp");

const multer = require("multer");

require("dotenv").config();

const {
  getObservations,
  getObservation,
  createObservation,
  deleteObservation,
  updateObservation,
  showImage,
  getStats,
  getStats1,
} = require("../controllers/sosController");

const router = express.Router();

// GET all observations
router.get("/allobservations", getObservations);
router.get("/stats", getStats); //get statistics
router.get("/stats1", getStats1); //get statistics

// GET a single observation
router.get("/:id", getObservation);

const storage = multer.memoryStorage(); //this is a good way to minimize file saving into the disk - just save it into memory as a buffer
const upload = multer({ storage });

//middleware to reduce image size using 'sharp' before saving to mongoDB database
const savePhotoDb = async (req, res, next) => {
  const gridFSBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    chunkSizeBytes: 1024,
    bucketName: "sosdocs",
  });

  // console.log(req.file);

  // await sharp(req.file.path, { failOnError: false }) //used when uploaded file is saved into the disk

  // shrink image before uploading to MongoDb --> 23-May-23
  const fname = `public/images/sos-${Date.now()}-${req.file.originalname}`;

  try {
    await sharp(req.file.buffer, { failOnError: false }) //using buffer here as the source to 'sharp'
      .resize(600, 600, {
        fit: sharp.fit.inside,
        withoutEnlargement: true, // if image's original width or height is less than specified width and height, sharp will do nothing(i.e no enlargement)
      })
      .toFile(fname); //save the 'sharp'-en image into a file. the idea of saving it to a file (with a filename) is because inside the mongoDb database, the filename is used as the reference inside 'sosdocs.file'
  } catch (error) {
    throw error;
  }

  //now, save to mongoDB database the photo - 23-May-23
  fs.createReadStream(fname)
    .pipe(gridFSBucket.openUploadStream(fname.slice(14, fname.length))) //up to the filename part ('sos-req.file.filename')
    .on("error", () => {
      console.log("Some error occured:" + error);
      res.send(error);
    })
    .on("finish", () => {
      console.log("done saving to mongoDB");

      req.fname = fname.slice(14, fname.length); //stuff the 'req' object with the filename (fname.slice(14, fname.length)) as this is needed
      //in the saving of the rest of req.body from the client. This (req.fname) goes to the 'attachment' field

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
