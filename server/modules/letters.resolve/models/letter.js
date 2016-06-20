"use strict";

const mongoose = require("mongoose.resolve");
const Mailbox  = require("mailboxes.resolve").Mailbox;
const validate = require("mongoose-validator");

let letterSchema = new mongoose.Schema({

  mailbox: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mailbox",
    required: "Mailbox must be set"
  },

  subject: {
    type: String,
    required: "Subject is required"
  },

  body: {
    type: String,
    required: "Body is required"
  },

  created: {
    type: Date,
    default: Date.now
  },

  to: {
    type: String,
    lowercase: true,
    trim: true,
    required: "'To' is required",
    validate: validate({
      validator: "isEmail",
      passIfEmpty: true,
      message: "'To' must be a valid email"
    })
  }

});

module.exports = mongoose.model("Letter", letterSchema);
