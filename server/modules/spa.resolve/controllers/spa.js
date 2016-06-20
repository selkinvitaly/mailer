"use strict";

module.exports = function*(next) {

  if (this.method !== "GET") return yield* next;

  this.body = this.render("./modules/spa.resolve/templates/index");

};
