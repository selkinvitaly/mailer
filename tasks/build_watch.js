"use strict";

const gulp   = require("gulp");
const config = require("config");

const paths  = config.get("gulp.tasks.watch")

module.exports = function(options) {

  return gulp.series(
    gulp.parallel("build:css", "build:sprite:svg", "build:img", "build:webpack"),

    gulp.parallel(function(done) {
      gulp.watch(paths.css, gulp.parallel("build:css"));
      gulp.watch(paths.svgSprite, gulp.parallel("build:sprite:svg"));
      done();
    },

    "build:bsync"
  ));

};
