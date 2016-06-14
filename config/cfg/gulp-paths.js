"use strict";

module.exports = {

  clean: {
    dest: "./server/public/*"
  },

  svgSprite: {
    src: "./client/img/svg-sprite/**/*.svg",
    dest: "./server/public/assets/img/"
  },

  img: {
    src: ["./client/img/!(base64|svg-sprite|png-sprite)", "./client/img/!(base64|svg-sprite|png-sprite)/**/*.*"],
    dest: "./server/public/assets/img/"
  },

  css: {
    src: "./client/css/*.styl",
    dest: "./server/public/assets/css/"
  },

  watch: {
    css: "./client/css/**/*.styl",
    svgSprite: "./client/img/svg-sprite/**/*.svg"
  }

};
