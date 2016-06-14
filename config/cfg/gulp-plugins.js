"use strict";

const path  = require("path");
const isDev = require("./environments").isDev;
const proxy = require("./server");

module.exports = function(root) {

  return {
    autoprefixer: {
      browsers: ["last 2 versions", "Firefox ESR", "ie >= 9"]
    },

    browserSync: {
      proxy: `${proxy.host}:${proxy.port}`,
      ghostMode: false,
      ui: false,
      notify: false,
      open: false
    },

    stylus: {
      compress: !isDev
    },

    cssBase64: {
      baseDir: "client/img/base64/",
      extensions: [/\.svg#base64/i],
      exclude: [],
      maxImageSize: 10 * 1024, // bytes
      debug: false
    },

    spriteSvg: {
      mode: {
        symbol: {
          dest: "./",
          bust: false,
          sprite: "sprite.svg"
        }
      },
      shape: {
        spacing: {
          box: "padding"
        }
      }
    },

    imagemin: {
      progressive: true
    },

    webpackOutput: {
      hash: true,
      version: false,
      timings: true,
      assets: true,
      chunks: false,
      chunkModules: false,
      children: false,
      reasons: false,
      source: false,
      errorDetails: true,
      chunkOrigins: false,
      modules: true,
      cached: true,
      colors: true
    }
  };

};
