const express = require("express");
const router = express.Router();

const passport = require("passport");
const isAuth = require("./authMiddleware").isAuth;
const isAdmin = require("./authMiddleware").isAdmin;

const mongoose = require("mongoose");
const User = require("../models/sosUsers");

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
  getStats2,
  createUser,
  updateUser,
  changePassword,
  forgot_post,
  reset_token_get,
  reset_token_post,
  resetPassword,
  getUsers,
  deleteUser,
  getCompanies,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
  closeObservation,
} = require("../controllers/sosController");

const storage = multer.memoryStorage(); //this is a good way to minimize file saving into the disk - just save it into memory as a buffer
const upload = multer({ storage });

//middleware to reduce image size using 'sharp' before saving to mongoDB database
const savePhotoDb = async (req, res, next) => {
  const gridFSBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    chunkSizeBytes: 1024,
    bucketName: "sosdocs",
  });

  // shrink image before uploading to MongoDb --> 23-May-23
  const fname = `public/images/sos-${Date.now()}-${req.file.originalname}`; //file to contain the sharpened image

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

/**
 * -------------- USER ROUTES ----------------
 */

// POST a new company
router.post("/company", createCompany);
router.get("/allcompanies", getCompanies);

//Login a user
router.post(
  "/login",
  (req, res, next) => {
    // console.log(req.body);
    next();
  },
  passport.authenticate("local", {
    failureRedirect: "/api/sos/login-failure",
    successRedirect: "/api/sos/login-success",
  })
);
//Successful login
router.get("/login-success", (req, res, next) => {
  console.log("Login success");
  console.log("user: ", req.user);
  const user = {
    id: req.user._id,
    email: req.user.email,
    lastname: req.user.lastname,
    firstname: req.user.firstname,
    company: req.user.company,
    position: req.user.position,
    auth: true,
    attachment: req.user.attachment,
  };
  res.json(user);
});

//Login fail
router.get("/login-failure", (req, res, next) => {
  console.log("Failed login");
  const user = {
    id: null,
    email: null,
    lastname: null,
    firstname: null,
    company: null,
    position: null,
    auth: false,
    attachment: null,
  };
  // res.send("You entered the wrong password.");
  res.json(user);
});

//Change user password
router.post("/passwd", isAuth, changePassword);

//Forgot user password
router.post("/forgot", forgot_post);
router.get("/reset/:token", reset_token_get);
router.post("/reset/:token", reset_token_post);
router.post("/resetpwd", resetPassword);

//Get all users
router.get("/allusers", isAuth, getUsers);

//Register a new user
router.post("/register", upload.single("file"), savePhotoDb, createUser);

//Update user profile information
router.post(
  "/user/:id",
  isAuth,
  upload.single("file"),
  savePhotoDb,
  updateUser
);

//Check for duplicate user (email address)
router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.id });
    console.log(user);
    res.json({ duplicate: user ? true : false });
  } catch (error) {
    console.log(error);
    res.status(401);
  }
});

// DELETE a user
router.delete("/user/:id", isAuth, deleteUser);

//Sample of protected route
router.get("/protected-route", isAuth, (req, res, next) => {
  res.send("You made it to the route.");
});

//Sample of admin route
router.get("/admin-route", isAdmin, (req, res, next) => {
  res.send("You made it to the admin route.");
});

//User logout
router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

/**
 * -------------- OBSERVATION ROUTES ----------------
 */

//Safety observation routes
router.get("/allobservations", isAuth, getObservations);

//Stats here
router.get("/stats", isAuth, getStats); //get statistics - by Type e.g. Unsafe Conditions, Unsafe Acts, etc.
router.get("/stats1", isAuth, getStats1); //get statistics - by Category on Unsafe Conditions, e.g. Housekeeping, Lifting, etc.
router.get("/stats2", isAuth, getStats2); //get statistics - by Category on Unsafe Acts, e.g. Non wearing of PPE

// GET a single observation
router.get("/:id", isAuth, getObservation);

// POST a new observation
router.post("/", isAuth, upload.single("file"), savePhotoDb, createObservation);

// DELETE a observation
router.delete("/:id", isAuth, deleteObservation);

// UPDATE a observation
router.patch("/:id", isAuth, updateObservation);

// CLOSE-OUT an observation
router.patch("/close/:id", isAuth, closeObservation);

router.get("/image/:filename", showImage);

/**
 * -------------- COMPANY ROUTES ----------------
 */
//Companies routes

// POST a new company
// router.post("/company", createCompany);

// POST a new company
router.get("/company/:id", getCompany);

// DELETE a company
router.delete("/company/:id", deleteCompany);

// UPDATE a observation
router.patch("/company/:id", updateCompany);

module.exports = router;
