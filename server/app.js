"use strict";

const Application = require("application");
const config = require("config");

const app = new Application();

app.keys = config.get("server.keys");

require("static-serve")(app);
require("http-logger")(app);
require("jade-render")(app);
require("error-handler")(app);
require("session")(app);
require("body-parser")(app);
require("auth")(app);
require("rest-api")(app);
require("spa")(app);

module.exports = app;
