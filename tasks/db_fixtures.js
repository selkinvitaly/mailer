"use strict";

const config = require("config");
const co     = require("co");
const path   = require("path");

const mongoose   = require("mongoose.resolve");
const loadModels = require(path.join(config.get("root"), "./fixtures/libs/loadModels"));

module.exports = function(options) {

  return function() {

    return co(function*() {
      yield mongoose.connect(config.get("mongoose.uri"), config.get("mongoose.options"));
      yield* loadModels("./fixtures");
      yield mongoose.disconnect();
    });

  };

};
