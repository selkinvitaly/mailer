"use strict";

exports.auth = function*(next) {
  if (!this.isAuthenticated()) {
    this.status = 401;

    return this.throw(401);
  }

  yield* next;
};

exports.getUser = function*(next) {
  if (!this.isAuthenticated()) {
    this.status = 401;

    return this.throw(401);
  }

  this.body = this.user;
};
