"use strict";

module.exports = function*(next) {

  if (this.method !== "GET") return yield* next;

  // if (this.isAuthenticated()) {
  this.body = this.render("./modules/spa/templates/index");
  // } else {
  //   this.throw(401);
  // }

};
