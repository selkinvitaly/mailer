"use strict";

const path = require("path");

const environments= require("./cfg/environments");

const root = process.cwd();

let config = module.exports = {};

config.root = root;
config.env = environments;
config.rootServer = path.join(root, "./server");
config.rootClient = path.join(root, "./client");

config.server = {
  host: "127.0.0.1",
  port: process.env.PORT || 3030,
  keys: ["mysecret"]
};

config.crypto = {
  length: 128,
  iterations: 1
};
