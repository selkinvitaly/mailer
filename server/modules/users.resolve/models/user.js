"use strict";

const mongoose = require("mongoose.resolve");
const crypto = require("crypto");
const config = require("config");
const validate = require("mongoose-validator");

let userSchema = new mongoose.Schema({

  fullName: {
    type: String,
    required: "The name must be present"
  },

  email: {
    type: String,
    lowercase: true,
    trim: true,
    required: "Email is required",
    validate: validate({
      validator: "isEmail",
      passIfEmpty: true,
      message: "Email must be valid"
    })
  },

  passwordHash: {
    type: String,
    required: true
  },

  salt: {
    required: true,
    type: String
  },

  created: {
    type: Date,
    default: Date.now
  },

  address: String,

  avatarUrl: {
    type: String,
    validate: validate({
      validator: "isURL",
      passIfEmpty: true,
      message: "Avatar must be an url"
    })
  },

  birthdate: {
    type: Date
  },

  gender: {
    type: String,
    enum: ["M", "F"]
  }

});

userSchema.virtual("password")
  .set(function(password) {
    if (password !== undefined && password.length < 4) {
      this.invalidate("password", "Your password must have 4 symbols!");
    }

    this._plainPassword = password;

    this.salt = crypto.randomBytes(config.get("crypto.length")).toString("base64");
    this.passwordHash = crypto.pbkdf2Sync(
      password,
      this.salt,
      config.get("crypto.iterations"),
      config.get("crypto.length")
    );
  })

  .get(function() {
    return this._plainPassword;
  });

userSchema.methods.checkPassword = function(password) {
  if (!password) return false; // empty password means no login by password
  if (!this.passwordHash) return false; // this user does not have password (the line below would hang!)

  return crypto.pbkdf2Sync(
    password,
    this.salt,
    config.get("crypto.iterations"),
    config.get("crypto.length")
  ).toString() == this.passwordHash;
};

module.exports = mongoose.model("User", userSchema);
