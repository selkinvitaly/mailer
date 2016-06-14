"use strict";

module.exports = function(app) {

  app.use(function*(next) {

    try {
      yield* next;
    } catch (e) {

      if (e.status) {
        this.body = e.message;
        this.statusCode = e.status;
      } else if (e.name === "ValidationError") {
        this.body = "ValidationError";
        this.status = 400;
      } else {
        this.body = "Error 500";
        this.status = 500;
        console.error(e.message, e.stack);
      }

    }
  });

};
