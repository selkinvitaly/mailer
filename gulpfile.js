"use strict";

const gulp = require("gulp");
const sync = require("browser-sync").create();
const root = require("config").root;
const path = require("path");

function lazyRequire(passedPath) {
  let args = Array.prototype.slice.call(arguments, 1);

  return function(done) {
    let taskPath = transformPath(passedPath);
    let taskFunc = require("./" + taskPath).apply(this, args);

    return taskFunc(done);
  };

  function transformPath(relativePath) {
    let absolute = path.resolve(root, relativePath);

    return path.relative(__dirname, absolute);
  }
};

gulp.task("build:clean", lazyRequire("./tasks/build_clean"));
gulp.task("build:bsync", lazyRequire("./tasks/build_bsync", { sync }));
gulp.task("build:css", lazyRequire("./tasks/build_css", { sync }));
gulp.task("build:img", lazyRequire("./tasks/build_img"));
gulp.task("build:sprite:svg", lazyRequire("./tasks/build_sprite-svg", { sync }));
gulp.task("build:webpack", lazyRequire("./tasks/build_webpack", { sync }));
gulp.task("build",gulp.series("build:clean", gulp.parallel("build:css", "build:sprite:svg", "build:img", "build:webpack")));
gulp.task("build:watch", lazyRequire("./tasks/build_watch"));

gulp.task("db:fixtures", lazyRequire("./tasks/db_fixtures"));
