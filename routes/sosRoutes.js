const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");
// const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const fs = require("fs");

require("dotenv").config();

// Create mongo connection
const DB_URI =
  process.env.NODE_ENV == "development"
    ? "mongodb://127.0.0.1:27017"
    : process.env.MONGO_URI;
const conn = mongoose.createConnection(DB_URI);

// Init gfs -- removed this code: 13-May-23 --> seems this does not do anything
// let gfs;

// conn.once("open", () => {
//   // Init stream
//   // console.log("Inside conn.once");
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection("uploads");
// });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// // Create storage engine
// const storage = new GridFsStorage({
//   url:
//     process.env.NODE_ENV == "development"
//       ? "mongodb://127.0.0.1:27017"
//       : process.env.MONGO_URI,
//   options: { useNewUrlParser: true, useUnifiedTopology: true },
//   file: (req, file) => {
//     const match = [
//       "image/png",
//       "image/jpeg",
//       "image/jpg",
//       "image/bmp",
//       "application/msword",
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//       "application/pdf",
//       "text/plain",
//       "application/vnd.ms-excel",
//       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//       "application/zip",
//       "application/x-7z-compressed",
//     ];

//     if (match.indexOf(file.mimetype) === -1) {
//       const filename = `${Date.now()}-ssd-${file.originalname}`;
//       return filename;
//     }

//     return {
//       bucketName: "docs",
//       filename: `${Date.now()}-ssd-${file.originalname}`,
//     };
//   },
// });
// const upload = multer({ storage });

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
