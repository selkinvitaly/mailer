"use strict";

const gutil   = require("gulp-util");
const webpack = require("webpack");
const notify  = require("gulp-notify");
const config  = require("config");

let cfgWebpack = config.get("webpackSpecs");
let cfgPlugins = config.get("gulp.plugins");

module.exports = function(options) {

  return function(done) {

    webpack(cfgWebpack, function(err, stats) {

      if (!err) {
        err = stats.toJson().errors[0];
      }

      if (err) {
        notify.onError({ title: "test:unit:specs task" });

        gutil.log(gutil.colors.red("[webpack]"));

        return gutil.log(err);
      }

      gutil.log("[webpack]", stats.toString(cfgPlugins.webpackOutput));

      done();
    });

  };

};
