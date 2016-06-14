"use strict";

const User = require("users").User;
const mongoose = require("odm");

exports.param = function*(id, next) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    this.throw(404);
  }

  this.userById = yield User.findById(id);

  if (!this.userById) {
    this.throw(404);
  }

  yield* next;
};

exports.getAll = function*(next) {
  let offset = +(this.request.query.offset || 0);
  let limit = +(this.request.query.limit || 10);

  if (isNaN(offset) || isNaN(limit)) {
    this.status = 400;
    return this.throw(400);
  }

  let data = yield User.find({}).lean();

  this.body = data.slice(offset, offset + limit);
};

exports.getById = function*(next) {
  this.body = this.userById.toObject();
};

exports.removeById = function*(next) {
  yield this.userById.remove();

  this.body = "removed";
};
