const mongoose = require("mongoose");
const Observation = require("../models/sosModel");

const fs = require("fs");

// get all observations
const getObservations = async (req, res) => {
  const observations = await Observation.find({}).sort({ createdAt: -1 });

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
  // console.log(req.body);
  const {
    observationType,
    companyWorkFor,
    location,
    involvedCompany,
    description,
    consequence,
    actionTaken,
    furtherActions,
    isResolved,
    reportedTo,
    yourName,
  } = req.body;

  // add to the database
  try {
    const observation = await Observation.create({
      observationType,
      companyWorkFor,
      location,
      involvedCompany,
      description,
      consequence,
      actionTaken,
      furtherActions,
      isResolved,
      reportedTo,
      yourName,
      attachment: "sos-" + req.file.filename,
    });
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
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such observation" });
  }

  const observation = await Observation.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!observation) {
    return res.status(400).json({ error: "No such observation" });
  }

  res.status(200).json(observation);
};

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

module.exports = {
  getObservations,
  getObservation,
  createObservation,
  deleteObservation,
  updateObservation,
  showImage,
};
