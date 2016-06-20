"use strict";

const oid = require("../libs/oid");

require("mailboxes.resolve"); // load mongoose model

module.exports = [{
  _id: oid("inbox"),
  title: "inbox"
}, {
  _id: oid("drafts"),
  title: "drafts"
}, {
  _id: oid("trash"),
  title: "trash"
}, {
  _id: oid("outbox"),
  title: "outbox"
}];
