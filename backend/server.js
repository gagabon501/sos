require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const DB_URI =
  process.env.NODE_ENV == "development"
    ? "mongodb://127.0.0.1:27017"
    : process.env.MONGO_URI;
const DB_LOCATION =
  process.env.NODE_ENV == "development" ? "local DB" : "Mongo Atlas DB";

//express app
const app = express();
const sosRoutes = require("./routes/sos");

//middleware -- sample setup
app.use(express.json()); //this is for accessing the body of the data

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next(); //this is very important to run - otherwise the code will not proceed to the next middleware/route
});

//routes
app.use("/api/sos", sosRoutes);

//test use to be removed

//connect to db
mongoose
  .connect(DB_URI)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log(
        `Connected to ${DB_LOCATION} and listening on port ${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
