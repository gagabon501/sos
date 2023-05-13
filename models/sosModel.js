const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ssdSchema = new Schema(
  {
    observationType: {
      type: String,
      required: true,
    },
    companyWorkFor: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    involvedCompany: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    consequence: {
      type: String,
    },
    actionTaken: {
      type: String,
    },
    furtherActions: {
      type: String,
    },
    isResolved: {
      type: String,
    },
    reportedTo: {
      type: String,
      required: true,
    },
    yourName: {
      type: String,
    },
    attachment: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SeeSayDo", ssdSchema);
