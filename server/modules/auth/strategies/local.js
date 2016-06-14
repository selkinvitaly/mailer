"use strict";

const LocalStrategy = require("passport-local").Strategy;
const User = require("users").User;

module.exports = new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
  },
  function(email, password, done) {
    User.findOne({ email: email }, function (err, user) {
      if (err) {
        return done(err);
      }

      if (!user || !user.checkPassword(password)) {
        // don't say whether the user exists

        return done(null, false, { message: "This user not found!" });
      }
      return done(null, user);
    });
  }
);
