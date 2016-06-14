"use strict";

const passport = require("koa-passport");
const localStrategy = require("./strategies/local");
const User = require("users").User;
const router = require("./router");

passport.serializeUser(function(user, done) {
  done(null, user.id); // uses _id as idField
});

passport.deserializeUser(function(id, done) {
  User.findById(id, done); // callback version checks id validity automatically
});

passport.use(localStrategy);

let passportInitialize = passport.initialize();

module.exports = function(app) {

  // clean passport session
  app.use(function* (next) {
    yield* next;

    if (this.session && this.session.passport && Object.keys(this.session.passport).length === 0) {
      delete this.session.passport;
    }
  });

  // passport initialize
  app.use(function* (next) {
    Object.defineProperty(this, "user", {
      get: function() {
        return this.req.user;
      }
    });

    yield passportInitialize.call(this, next);
  });

  // passport session
  app.use(passport.session());

  // routes
  app.use(router.routes());

};
