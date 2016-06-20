"use strict";

const root = process.cwd();

const webpackConfig      = require("./cfg/webpack")(root);
const webpackSpecsConfig = require("./cfg/webpack-specs")(root);
const tasksConfig        = require("./cfg/gulp-paths");
const pluginsConfig      = require("./cfg/gulp-plugins")(root);
const karmaConfig        = require("./cfg/karma")(root);

let config = module.exports = {};

config.webpack = webpackConfig;
config.webpackSpecs = webpackSpecsConfig;

config.gulp = {
  plugins: pluginsConfig,
  tasks: tasksConfig
};

config.karma = karmaConfig;

config.mongoose = {
  uri: "mongodb://127.0.0.1/gmail",
  options: {
    server: {
      socketOptions: {
        keepAlive: 1
      },
      poolSize: 5
    }
  }
};
