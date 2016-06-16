"use strict";

const path     = require("path");
const webpack  = require("webpack");
const aprefix  = require("autoprefixer");
const annotate = require("ng-annotate-webpack-plugin");
const isDev    = require("./environments").isDev;
const isWatch  = require("./environments").isWatch;
const angular  = require("./angular");

module.exports = function(root) {

  let options = {
    watch: isWatch,
    context: root,
    entry: {
      app: ["./client/js/index.js"],
      vendor: ["angular"]
    },
    output: {
      path: path.join(root, "./server/public/assets/js/"),
      filename: "[name].js",
      chunkFilename: "[id].js",
      publicPath: "",
      pathinfo: isDev
    },
    debug: isWatch,
    devtool: isWatch ? "#inline-source-map" : null,
    resolve: {
      modules: [ root, "node_modules" ],
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
        APP_CONF: angular
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        minChunks: Infinity
      })
    ],
    module: {
      loaders: [{
        test: /\.js$/,
        loader: "babel-loader",
        include: [
          path.join(root, "./client")
        ],
        query: {
          presets: ["es2015-webpack"]
        }
      }, {
        test: /\.html$/,
        loader: "html-loader",
        include: [
          path.join(root, "./client")
        ],
        query: {
          attrs: false
        }
      }, {
        test: /\.styl$/,
        loader: isDev ? "style-loader!css-loader!postcss-loader!stylus-loader?resolve url"
                      : "style-loader!css-loader?minimize!postcss-loader!stylus-loader?resolve url"
      }, {
        test: /\.svg$/,
        loader: "svg-url-loader!svgo-loader"
      }],
      noParse: [
        /angular\/angular.js/
      ]
    },
    postcss: function () {
      return [aprefix({
        browsers: ["last 2 versions", "Firefox ESR", "ie >= 9"]
      })];
    }
  };

  if (!isDev) {
    options.plugins.push(
      new annotate(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          "warnings": false,
          "drop_debugger": true,
          "drop_console" : true,
          "unsafe": true
        }
      })
    );
  }

  // if (!isWatch) {
  //   options.plugins.push(
  //     new webpack.optimize.DedupePlugin()
  //   );
  // }

  return options;
};
