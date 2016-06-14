"use strict";

exports.post = function*(next) {
  this.logout();
  this.body = "you are logged out!";
};
