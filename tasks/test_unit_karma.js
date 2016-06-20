"use strict";

const karma  = require("karma");
const config = require("config");

const cfgKarma = config.get("karma");

module.exports = function(options) {

  return function(done) {

    let server = new karma.Server(cfgKarma, exitCode => {
      console.log("karma has exited with " + exitCode);

      done();
    });

    server.start();

  };

};
