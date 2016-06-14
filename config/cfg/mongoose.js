"use strict";

module.exports = {
  uri: "mongodb://127.0.0.1:3003/gmail",
  options: {
    server: {
      socketOptions: {
        keepAlive: 1
      },
      poolSize: 5
    }
  }
};
