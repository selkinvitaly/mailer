"use strict";

const mongoose = require("mongoose.resolve");
const config   = require("config");
const path     = require("path");

module.exports = function*(data) {
  let modelsData = (typeof data === "string")
    ? require(path.join(config.get("root"), data))
    : data;

  for (let modelName in modelsData) {
    let Model = mongoose.models[modelName];

    yield Model.remove({});
    yield* loadModel(Model, modelsData[modelName]);
  }
};

function *loadModel(Model, data) {

  for (let i = 0; i < data.length; i++) {
    yield Model.create(data[i]);
  }

}
