const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/sosUsers");
const bcrypt = require("bcrypt");

const customFields = {
  usernameField: "email",
  passwordField: "password",
};

const verifyCallback = (username, password, done) => {
  console.log("Verify callback username: ", username);
  console.log("Verify callback password: ", password);

  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        return done(null, false);
      }

      const isValid = bcrypt.compareSync(password, user.password);

      if (isValid) {
        console.log("Yehey valid!");
        return done(null, user);
      } else {
        console.log("Invalid!");
        return done(null, false);
      }
    })
    .catch((err) => {
      done(err);
    });
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});
