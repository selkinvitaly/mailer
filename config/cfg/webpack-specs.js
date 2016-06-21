"use strict";

const path    = require("path");
const webpack = require("webpack");

const env = require("./environments");

const isUnitWatch = env.isUnitWatch;

module.exports = function(root) {

  let options = {
    context: root,
    entry: {
      specs: "./client/test/unit/index.js"
    },
    watch: isUnitWatch,
    output: {
      path: path.join(root, "./server/public/assets/js/"),
      filename: "[name].js"
    },
    debug: true,
    devtool: "#inline-source-map",
    resolve: {
      modules: [
        [ root, path.join(root, "./client/js/") ],
        "node_modules"
      ],
      extensions: [".js"],
      enforceModuleExtension: false,
      enforceExtension: false,
      mainFields: ["main"],
      descriptionFiles: ["package.json"]
    },
    resolveLoader: {
      modulesDirectories: ["node_modules"],
      extensions: ["", ".loader.js", ".js"],
      moduleTemplates: ["*-loader", "*"]
    },
    plugins: [
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
        APP_CONF: {
          baseApi: JSON.stringify("http://localhost:3000/api")
        }
      })
    ]
  };

  return options;
};
