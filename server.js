const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
// const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const MongoStore = require("connect-mongo");

// const methodOverride = require("method-override");

// const User = require("./models/sosUsers");

/**
 * -------------- GENERAL SETUP ----------------
 */

require("dotenv").config();

// connect to db
const DB_URI =
  process.env.NODE_ENV == "development"
    ? "mongodb://127.0.0.1:27017"
    : process.env.MONGO_URI;
const DB_LOCATION =
  process.env.NODE_ENV == "development" ? "local DB" : "Mongo Atlas DB";

// express app
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); //use static folder public
app.use("/images", express.static("images"));

app.use(flash());

/**
 * -------------- SESSION SETUP ----------------
 */

// const connection = mongoose.connection;

//session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: DB_URI,
    }),
  })
);

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */

//passport middlewares

// Need to require the entire Passport config module so app.js knows about it
require("./config/passport");

app.use(passport.initialize());
app.use(passport.session());

//Console logging middlewares
app.use((req, res, next) => {
  console.log(req.path, req.method); //logging to console what route is currently being taken
  console.log("session id: ", req.session.id);
  // console.log(req.session);
  // console.log(req.user);
  next();
});

//Forced HTTPS: 18-June-23
app.use((req, res, next) => {
  if (!process.env.NODE_ENV == "development") {
    if (req.headers["x-forwarded-proto"] !== "https")
      return res.redirect("https://" + req.headers.host + req.url);
    else return next();
  } else {
    return next();
  }
});

/**
 * -------------- ROUTES ----------------
 */
const sosRoutes = require("./routes/sosRoutes");
app.use("/api/sos", sosRoutes); //this is the base route: /api/sos

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
