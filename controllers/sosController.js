const mongoose = require("mongoose");
const Observation = require("../models/sosModel");

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
      attachment: req.fname, //this req.fname was added from the previous middleware
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

const getStats = async (req, res) => {
  const obs001 = await Observation.countDocuments({
    observationType: "OBS001-Unsafe Condition",
  });
  const obs002 = await Observation.countDocuments({
    observationType: "OBS002-Unsafe Behaviour",
  });
  const obs003 = await Observation.countDocuments({
    observationType: "OBS003-Environmental Hazard",
  });
  const obs004 = await Observation.countDocuments({
    observationType: "OBS004-Safe Conditions",
  });
  const obs005 = await Observation.countDocuments({
    observationType: "OBS005-Safe Behaviour",
  });
  const obs006 = await Observation.countDocuments({
    observationType: "OBS006-Environmental Opportunity",
  });
  const obs007 = await Observation.countDocuments({
    observationType: "OBS007-Opportunity for Improvement",
  });
  const data = [
    { name: "UnsafeConditions", count: obs001 },
    { name: "UnsafeBehaviour", count: obs002 },
    { name: "EnviroHazards", count: obs003 },
    { name: "SafeConditions", count: obs004 },
    { name: "SafeBehaviours", count: obs005 },
    { name: "EnviroOpportunity", count: obs006 },
    { name: "OpportImprove", count: obs007 },
  ];
  console.log("stats data: ", data);
  res.status(200).json(data);
};

const getStats1 = async (req, res) => {
  const obs001 = await Observation.countDocuments({
    observationCategory: "CAT001-General housekeeping",
  });
  const obs002 = await Observation.countDocuments({
    observationCategory: "CAT002-Slip, trip and fall hazards",
  });
  const obs003 = await Observation.countDocuments({
    observationCategory: "CAT003-Electrical hazards",
  });
  const obs004 = await Observation.countDocuments({
    observationCategory: "CAT004-Equipment operation",
  });
  const obs005 = await Observation.countDocuments({
    observationCategory: "CAT005-Mobile plant and equipment",
  });
  const obs006 = await Observation.countDocuments({
    observationCategory: "CAT006-Fire protection",
  });
  const obs007 = await Observation.countDocuments({
    observationCategory: "CAT007-Confined spaces",
  });
  const obs008 = await Observation.countDocuments({
    observationCategory: "CAT008-Working at height",
  });
  const obs009 = await Observation.countDocuments({
    observationCategory: "CAT009-Lifting",
  });
  const obs010 = await Observation.countDocuments({
    observationCategory: "CAT010-Pressurised systems",
  });

  const data = [
    { name: "Housekeeping", count: obs001 },
    { name: "Slip/Trip/Falls", count: obs002 },
    { name: "ElectHazards", count: obs003 },
    { name: "EqptOperation", count: obs004 },
    { name: "MobilePlant", count: obs005 },
    { name: "FireProtection", count: obs006 },
    { name: "ConfinedSpaces", count: obs007 },
    { name: "WorkingAtHeight", count: obs008 },
    { name: "Lifting", count: obs009 },
    { name: "PressurisedSys", count: obs010 },
  ];
  console.log("stats data: ", data);
  res.status(200).json(data);
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
};
