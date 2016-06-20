"use strict";

const Application = require("application.resolve");
const config = require("config");

const app = new Application();

app.keys = config.get("server.keys");

require("static-serve.resolve")(app);
require("http-logger.resolve")(app);
require("jade-render.resolve")(app);
require("error-handler.resolve")(app);
require("session.resolve")(app);
require("body-parser.resolve")(app);
require("auth.resolve")(app);
require("rest-api.resolve")(app);
require("spa.resolve")(app);

module.exports = app;
