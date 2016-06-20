"use strict";

const jade   = require("jade");
const config = require("config");
const path   = require("path");

module.exports = function(app) {

  app.use(function* (next) {
    let ctx = this;

    /* default helpers */
    this.locals = {
      /* at the time of this middleware, user is unknown, so we make it a getter */
      get user() {
        return ctx.req.user; // passport sets this
      }
    };

    this.render = function(templatePath, locals) {
      locals = locals || {};
      // warning!
      // _.assign does NOT copy defineProperty
      // so I use this.locals as a root and merge all props in it, instead of cloning this.locals
      let localsFull = Object.create(this.locals);

      for (let key in locals) {
        localsFull[key] = locals[key];
      }

      let templatePathResolved = path.join(config.get("rootServer"), templatePath + ".jade");

      return jade.renderFile(templatePathResolved, localsFull);
    };

    yield* next;
  });

};
