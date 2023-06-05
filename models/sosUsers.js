const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sosUserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    position: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SosUser", sosUserSchema);
