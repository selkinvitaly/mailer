"use strict";

const Letter = require("letters.resolve").Letter;
const mongoose = require("mongoose.resolve");

exports.param = function*(id, next) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    this.status = 400;
    this.throw(400);
  }

  this.fetchedLetter = yield Letter.findById(id);

  if (!this.fetchedLetter) {
    this.status = 404;
    this.throw(404);
  }

  yield* next;
};

exports.count = function*(next) {
  let letters = yield Letter.find({}).lean();
  let count = {};

  letters.forEach(letter => {
    let boxid = letter.mailbox;

    count[boxid] = (count[boxid] || 0) + 1;
  });

  this.body = count;
}

exports.getById = function*(next) {
  this.body = this.fetchedLetter.toObject();
};

exports.create = function*(next) {
  this.body = yield Letter.create(this.request.body);
};

exports.removeById = function*(next) {
  yield this.fetchedLetter.remove();

  this.body = "removed";
};

exports.removeMoreById = function*(next) {
  let deleteId = this.request.body.deleteId || [];

  if (!deleteId.length) {
    this.body = [];
    return yield* next;
  }

  let promises = deleteId.map(id => {
    return Letter
      .remove({ _id: id })
      .then(() => id, err => err);
  });

  let results = yield Promise.all(promises);
  let filteredFromError = results.filter(result => typeof result !== "object");

  this.body = filteredFromError;
};
