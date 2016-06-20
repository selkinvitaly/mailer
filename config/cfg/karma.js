// Karma configuration
// Generated on Fri Jun 17 2016 14:46:39 GMT+0300 (MSK)

const env = require("./environments");

const isUnitWatch = env.isUnitWatch;

module.exports = function(root) {

  return {

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: root,


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ["mocha", "chai", "sinon"],


    // list of files / patterns to load in the browser
    files: [
      "./server/public/assets/js/vendor.js",
      "./server/public/assets/js/app.js",
      "./server/public/assets/js/specs.js"
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ["progress"],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: isUnitWatch,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ["Chrome"],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: !isUnitWatch,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity

  };

};
