"use strict";

const User = require("users.resolve").User;
const mongoose = require("mongoose.resolve");

exports.param = function*(id, next) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    this.status = 400;
    return this.throw(400);
  }

  this.userById = yield User.findById(id);

  if (!this.userById) {
    this.status = 404;
    return this.throw(404);
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

  let data = yield User.find({}, null, { skip: offset, limit }).lean();

  this.body = data;
};

exports.getById = function*(next) {
  this.body = this.userById.toObject();
};

exports.removeById = function*(next) {
  yield this.userById.remove();

  this.body = "removed";
};
