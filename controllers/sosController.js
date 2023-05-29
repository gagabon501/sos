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
          const final = data.filter((d) => d != undefined);
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
          const final = data.filter((d) => d != undefined);
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
          const final = data.filter((d) => d != undefined);
          res.status(200).json(final); //Finally!!! I got you! --> 28-May-2023
        });
      });
    });
  } catch (error) {
    return res.status(500).json(error.message);
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
};
