"use strict";

const mongoose = require("mongoose.resolve");

let mailboxSchema = new mongoose.Schema({

  title: {
    type: String,
    required: "The name of mailbox must be present"
  }

});

module.exports = mongoose.model("Mailbox", mailboxSchema);
