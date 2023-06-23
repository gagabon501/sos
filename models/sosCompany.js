const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sosCompanySchema = new Schema(
  {
    company: {
      type: String,
      unique: true,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contactname: {
      type: String,
      required: true,
    },
    contactposition: {
      type: String,
      required: true,
    },
    contactmobile: {
      type: String,
      required: true,
    },
    contactemail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SosCompany", sosCompanySchema);
