"use strict";

const session = require("koa-generic-session");
const mongooseStore = require("koa-session-mongoose");

const sessionStore = mongooseStore.create({
  model: "Session"
});

module.exports = function(app) {

  app.use(session({
    store: sessionStore
  }));

};
