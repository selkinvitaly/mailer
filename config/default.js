"use strict";

const root = process.cwd();

const path = require("path");

const envConfig      = require("./cfg/environments");
const webpackConfig  = require("./cfg/webpack")(root);
const tasksConfig    = require("./cfg/gulp-paths");
const mongooseConfig = require("./cfg/mongoose");
const serverConfig   = require("./cfg/server");
const cryptoConfig   = require("./cfg/crypto");
const pluginsConfig  = require("./cfg/gulp-plugins")(root);

let config = module.exports = {};

config.root = root;
config.rootServer = path.join(root, "./server");
config.rootClient = path.join(root, "./client");

config.webpack = webpackConfig;
config.gulp = {
  plugins: pluginsConfig,
  tasks: tasksConfig
};

config.env = envConfig;

config.mongoose = mongooseConfig;
config.server = serverConfig;
config.crypto = cryptoConfig;
