"use strict";

const Mailbox = require("mailboxes").Mailbox;
const Letter = require("letters").Letter;
const mongoose = require("odm");

exports.param = function*(id, next) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    this.throw(404);
  }

  yield* next;
};

exports.getAll = function*(next) {
  this.body = yield Mailbox.find({}).lean();
};

exports.getLetters = function*(next) {
  let offset = +(this.request.query.offset || 0);
  let limit = +(this.request.query.limit || 10);

  if (isNaN(offset) || isNaN(limit)) {
    this.status = 400;
    return this.throw(400);
  }

  let data = yield Letter.find({ mailbox: this.params.boxid }, null, { skip: offset, limit }).lean();

  this.body = data;
};

exports.cleanupMailbox = function*(next) {
  yield Letter.remove({ mailbox: this.params.boxid });

  this.body = "removed";
};
