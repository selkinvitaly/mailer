"use strict";

const mongoose = require("mongoose.resolve");
const Koa = require("koa");
const config = require("config");

module.exports = class Application extends Koa {

  start() {
    return Promise.all([
      mongoose.connect(config.get("mongoose.uri"), config.get("mongoose.options")),
      new Promise((resolve, reject) => {
        this.server = this.listen({
          port: config.get("server.port")
        }, err => err ? reject(err) : resolve());
      })
    ]);
  }

  stop() {
    return Promise.all([
      mongoose.disconnect(),
      new Promise((resolve, reject) => {
        this.server.close(err => err ? reject(err) : resolve());
      })
    ]);
  }

};
