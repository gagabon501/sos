const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

require("dotenv").config();

const sosRoutes = require("./routes/sosRoutes");

// express app
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); //use static folder public
app.use("/images", express.static("images"));

// routes
app.use((req, res, next) => {
  console.log(req.path, req.method); //logging to console what route is currently being taken
  next();
});

app.use("/api/sos", sosRoutes); //this is the base route: /api/sos

// connect to db
const DB_URI =
  process.env.NODE_ENV == "development"
    ? "mongodb://127.0.0.1:27017"
    : process.env.MONGO_URI;
const DB_LOCATION =
  process.env.NODE_ENV == "development" ? "local DB" : "Mongo Atlas DB";

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log(`connected to database ${DB_LOCATION}`);
    if (process.env.NODE_ENV === "production") {
      // Step 1:
      app.use(express.static(path.resolve(__dirname, "./client/build")));
      // Step 2:
      app.get("*", function (request, response) {
        response.sendFile(
          path.resolve(__dirname, "./client/build", "index.html")
        );
      });
    }
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log("listening for requests on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
