const moment = require("moment");

const mongoose = require("mongoose");

//Models
const Observation = require("../models/sosObservations");
const User = require("../models/sosUsers");
const Company = require("../models/sosCompany");

const bcrypt = require("bcrypt");
const async = require("async");
const crypto = require("crypto");

const { sendMail } = require("../helpers/gaglib");

/**
 * -------------- OBSERVATION CONTROLLERS ----------------
 */

// get all observations
const getObservations = async (req, res) => {
  const observations = await Observation.find({}).sort({ createdAt: -1 });
  // console.log("server side: ", observations);
  res.status(200).json(observations);
};

// get a single observation
const getObservation = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such observation" });
  }

  const observation = await Observation.findById(id);

  if (!observation) {
    return res.status(404).json({ error: "No such observation" });
  }

  res.status(200).json(observation);
};

// create a new observation
const createObservation = async (req, res) => {
  const {
    observationType,
    observationCategory,
    location,
    involvedCompany,
    description,
    consequence,
    actionTaken,
    furtherActions,
    isResolved,
    reportedTo,
    yourName,
    duedate,
    status,
  } = req.body;

  // add to the database
  try {
    const observation = await Observation.create({
      observationType,
      observationCategory,
      location,
      involvedCompany,
      description,
      consequence,
      actionTaken,
      furtherActions,
      isResolved,
      reportedTo,
      yourName,
      duedate,
      status,
      attachment: req.fname, //this req.fname was added from the previous middleware
    });
    var recvr = involvedCompany,
      subject = "Safety Observation: " + observation._id,
      emailbody =
        "The following observation was raised to your company: " +
        "\n\n" +
        "Type: " +
        observation.observationType +
        "\n" +
        "Description: " +
        observation.description +
        "\n" +
        "Due date is: " +
        moment(observation.duedate).format("DD-MMM-YYYY");

    sendMail(recvr, subject, emailbody);

    res.status(200).json(observation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a observation
const deleteObservation = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such observation" });
  }

  const observation = await Observation.findOneAndDelete({ _id: id });

  if (!observation) {
    return res.status(400).json({ error: "No such observation" });
  }

  res.status(200).json(observation);
};

// update a observation
const updateObservation = async (req, res) => {
  console.log("req.body: ", req.body);
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such observation" });
  }

  const observation = await Observation.findOneAndUpdate(
    { _id: id },
    {
      duedate: req.body.duedate,
    },
    { new: true }
  );

  if (!observation) {
    return res.status(400).json({ error: "No such observation" });
  }
  req.body._id = id;
  console.log(req.body);
  console.log(observation);

  res.status(200).json(observation);
};

/**
 * -------------- COMPANY CONTROLLERS ----------------
 */

// get all companies
const getCompanies = async (req, res) => {
  console.log("List companies here!");
  const companies = await Company.find({}).sort({ createdAt: -1 });
  console.log("server side: ", companies);
  res.status(200).json(companies);
};

// get a single observation
const getCompany = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such company" });
  }

  const company = await Company.findById(id);

  if (!company) {
    return res.status(404).json({ error: "No such company" });
  }

  res.status(200).json(company);
};

// create a new company
const createCompany = async (req, res) => {
  console.log("Hey I am here!");
  console.log(req.body);
  const {
    company,
    address,
    contactname,
    contactposition,
    contactmobile,
    contactemail,
  } = req.body;

  // add to the database
  try {
    const companynew = await Company.create({
      company,
      address,
      contactname,
      contactposition,
      contactmobile,
      contactemail,
    });
    res.status(200).json(companynew);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a company
const deleteCompany = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such company" });
  }

  const company = await Company.findOneAndDelete({ _id: id });

  if (!company) {
    return res.status(400).json({ error: "No such company" });
  }

  res.status(200).json(company);
};

// update a company
const updateCompany = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such company" });
  }

  const company = await Company.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!company) {
    return res.status(400).json({ error: "No such company" });
  }
  req.body._id = id;
  console.log(req.body);

  res.status(200).json(req.body);
};

/**
 * -------------- SHOW IMAGE CONTROLLER ----------------
 */
const showImage = (req, res) => {
  // console.log(mongoose.connection.db);
  let gridFSBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    chunkSizeBytes: 1024,
    bucketName: "sosdocs",
  });

  const readstream = gridFSBucket.openDownloadStreamByName(req.params.filename);
  readstream.pipe(res);
};

// const showImage = (req, res) => {
//   res.redirect(`/images/${req.params.filename}`); //well done mate! re-routed the API call! now using static file instead of saving into mongodb: 13-May-23
// };

/**
 * -------------- STATISTICS CONTROLLERS ----------------
 */

//The following codes are really done well! I re-factored the code so that there is a single function to retrieve data for statistics.
//This is parameterized so that the filter conditions are passed here from the calling function. This is contained in the 'soscat' parameter
const statsData = async (soscat) => {
  let obsData = [];

  //iterate the array of objects that is passed in here from 'soscat'.
  obsData = soscat.map(async (cat) => {
    const categoryName = Object.values(cat).toString();

    const dataCount = await Observation.countDocuments(cat).then((value) => {
      if (value) {
        const data = {
          name: categoryName.substring(7, categoryName.length),
          count: value,
        };
        return data; //return to dataCount
      }
    });

    return dataCount; //return to obsData --> creates a Promise
  });

  return obsData; //returns a Promise
};

const getStats = async (req, res) => {
  const category = [
    { observationType: "OBS001-Unsafe Condition" },
    { observationType: "OBS002-Unsafe Behaviour" },
    { observationType: "OBS003-Environmental Hazard" },
    { observationType: "OBS004-Safe Conditions" },
    { observationType: "OBS006-Environmental Opportunity" },
    { observationType: "OBS005-Safe Behaviour" },
    { observationType: "OBS007-Opportunity for Improvement" },
  ];
  try {
    const data = statsData(category); //returns a single Promise which contains an array of promises, hence the need to Promise.all() to create again one single promise
    Promise.resolve(data).then((finalvalue) => {
      Promise.all(finalvalue).then((value) => {
        Promise.resolve(value).then((data) => {
          const final = data.filter((d) => d != undefined); //This will only include data that has values in it (> 0) --> 29-05-23
          res.status(200).json(final); //Finally!!! I got you! --> 28-May-2023
        });
      });
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getStats1 = async (req, res) => {
  const category = [
    { observationCategory: "CAT001-General housekeeping" },
    { observationCategory: "CAT002-Slip, trip and fall hazards" },
    { observationCategory: "CAT003-Electrical hazards" },
    { observationCategory: "CAT004-Equipment operation" },
    { observationCategory: "CAT005-Mobile plant and equipment" },
    { observationCategory: "CAT006-Fire protection" },
    { observationCategory: "CAT007-Confined spaces" },
    { observationCategory: "CAT008-Working at height" },
    { observationCategory: "CAT009-Lifting" },
    { observationCategory: "CAT010-Pressurised systems" },
  ];
  try {
    const data = statsData(category); //returns a single Promise which contains an array of promises, hence the need to Promise.all() to create again one single promise
    Promise.resolve(data).then((finalvalue) => {
      Promise.all(finalvalue).then((value) => {
        Promise.resolve(value).then((data) => {
          const final = data.filter((d) => d != undefined); //This will only include data that has values in it (> 0) --> 29-05-23
          res.status(200).json(final); //Finally!!! I got you! --> 28-May-2023
        });
      });
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getStats2 = async (req, res) => {
  const category = [
    { observationCategory: "CAT021-Non wearing of PPE" },
    { observationCategory: "CAT022-Working without Permit-to-Work" },
    { observationCategory: "CAT022-Operating equipment without license" },
    { observationCategory: "CAT023-Working under suspended load" },
    { observationCategory: "CAT024-Working without fall protection" },
    { observationCategory: "CAT025-Smoking/vaping on site" },
    { observationCategory: "CAT026-Swearing/foul language" },
    { observationCategory: "CAT027-Bullying/harassment" },
  ];
  try {
    const data = statsData(category); //returns a single Promise which contains an array of promises, hence the need to Promise.all() to create again one single promise
    Promise.resolve(data).then((finalvalue) => {
      Promise.all(finalvalue).then((value) => {
        Promise.resolve(value).then((data) => {
          const final = data.filter((d) => d != undefined); //This will only include data that has values in it (> 0) --> 29-05-23
          res.status(200).json(final); //Finally!!! I got you! --> 28-May-2023
        });
      });
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

/**
 * -------------- USER CONTROLLERS ----------------
 */

// get all users
const getUsers = async (req, res) => {
  const users = await User.find({}).sort({ lastname: -1 });
  console.log("server side users: ", users);
  res.status(200).json(users);
};

// create a new user
const createUser = async (req, res) => {
  const { email, password, lastname, firstname, company, position } = req.body;

  // add to the database
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
      lastname,
      firstname,
      company,
      position,
      attachment: req.fname, //this req.fname was added from the previous middleware
      admin: false,
    });
    console.log("new user:", user);
    // res.redirect("/api/sos/login");
    res.status(200).json({ message: "User created" });
  } catch (error) {
    res.redirect("/register");
  }
};

const updateUser = async (req, res) => {
  const { lastname, firstname, company, position } = req.body;

  // update the database
  try {
    const user = await User.findOneAndUpdate(
      { email: req.params.id },
      {
        lastname,
        firstname,
        company,
        position,
        attachment: req.fname, //this req.fname was added from the previous middleware
      },
      { new: true }
    );
    const updateduser = {
      id: user.id,
      email: user.email,
      lastname: user.lastname,
      firstname: user.firstname,
      position: user.position,
      company: user.company,
      attachment: user.attachment,
      auth: true,
    };
    console.log("updated user:", updateduser);
    res.status(200).json(updateduser);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

// delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such user" });
  }

  const user = await User.findOneAndDelete({ _id: id });

  if (!user) {
    return res.status(400).json({ error: "No such user" });
  }

  res.status(200).json(user);
};

const changePassword = async (req, res) => {
  const { email, password, oldpassword } = req.body;

  // update the database with new user password
  try {
    const userpassword = await User.findOne({ email }); //get user information first including password
    const isValid = bcrypt.compareSync(oldpassword, userpassword.password); //compare stored password with the hashed password passed from the client side
    if (isValid) {
      console.log("Valid password");
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.findOneAndUpdate(
        { email },
        {
          password: hashedPassword,
        },
        { new: true }
      );
      console.log("password updated for user:", user);
      res.status(200).json({ valid: true, message: "password updated" });
    } else {
      console.log("Invalid password");
      res.status(200).json({ valid: false, message: "wrong password entered" });
    }
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

// forgot password

const forgot_post = (req, res, next) => {
  async.waterfall(
    [
      function (done) {
        crypto.randomBytes(4, function (err, buf) {
          var token = buf.toString("hex");
          done(err, token);
        });
      },
      function (token, done) {
        User.findOne({ email: req.body.email }, function (err, user) {
          if (!user) {
            req.flash("error", "User not found!");
            return res
              .status(200)
              .json({ message: "User does not exist", valid: false });

            //res.render('forgot',{errmsg: "User not found!"})
          }

          user.resetPasswordToken = token.toUpperCase();
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

          //save token and expiry into database (User)
          user.save(function (err) {
            done(err, token, user);
          });
        });
      },
      function (token, user, done) {
        var recvr = user.email,
          subject = "Safety Observation System Password Reset",
          emailbody =
            "You are receiving this because you (or someone else) has requested the reset of the password for your account.\n\n" +
            "Please enter the following code in the verification box: " +
            token.toUpperCase() +
            "\n\n" +
            "If you did not request this, please ignore this email and your password will remain unchanged.\n";

        sendMail(recvr, subject, emailbody);
        res.status(200).json({ message: "Reset email sent", valid: true });
      },
    ],
    function (err) {
      if (err) return next(err);
      // res.redirect("/api/sos/forgot");
    }
  );
};

const reset_token_get = (req, res) => {
  // console.log(req.params.token);
  User.findOne(
    {
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    },
    function (err, user) {
      // console.log("user: ", user);
      if (user === null) {
        req.flash("error", "Password reset token is invalid or has expired.");
        // return res.redirect("/api/sos/forgot");
        res.status(200).json({ token: "not found" });
      } else {
        res.status(200).json({ token: user.resetPasswordToken });
      }
    }
  );
};

const reset_token_post = (req, res) => {
  async.waterfall(
    [
      function (done) {
        User.findOne(
          {
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() },
          },
          function (err, user) {
            if (!user) {
              req.flash(
                "error",
                "Password reset token is invalid or has expired."
              );
              return res.redirect("back");
            }
            if (req.body.password === req.body.confirm) {
              bcrypt.genSalt(10, function (err, salt) {
                if (err) return next(err);
                bcrypt.hash(req.body.password, salt, function (err, hash) {
                  if (err) return next(err);
                  req.body.password = hash;
                  var userData = new User({
                    password: req.body.password,
                    //passwordConf: req.body.confirm,
                    _id: user._id,
                  });
                  User.findByIdAndUpdate(
                    user._id,
                    userData,
                    {},
                    function (err, theuser) {
                      if (err) {
                        return next(err);
                      }
                    }
                  );
                });
              });
              user.resetPasswordToken = undefined;
              user.resetPasswordExpires = undefined;

              var recvr = user.email,
                subject = "Safety Observation System - Password changed",
                emailbody =
                  "Hello,\n\n" +
                  "This is a confirmation that the password for your account " +
                  user.email +
                  " has just been changed.\n";
              sendMail(recvr, subject, emailbody); //located at the top of this file

              req.flash("success", "Success! Your password has been changed.");
              res.redirect("/");
            } else {
              req.flash("error", "Passwords do not match.");
              return res.redirect("back");
            }
          }
        );
      },
    ],
    function (err) {
      res.redirect("/");
    }
  );
};
const resetPassword = async (req, res) => {
  const { email, password } = req.body;

  // update the database with new user password
  try {
    // const userpassword = await User.findOne({ email }); //get user information first including password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findOneAndUpdate(
      { email },
      {
        password: hashedPassword,
      },
      { new: true }
    );
    console.log("password updated for user:", user);
    res.status(200).json({ valid: true, message: "password updated" });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

module.exports = {
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
};
