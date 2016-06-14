"use strict";

export default function($state, Notify) {
  "ngInject";

  class Service {
    constructor() {
      this.history = [];
    }

    handle(err) {
      this.history.push(err);

      if (err.status === 400) {

        Notify.add("Oops! Bad request!");

      } else if (err.status === 401) {

        Notify.add("You need authenticate!");
        $state.go("login");

      } else if (err.status === 404) {

        Notify.add("Sorry! Not found!");

      } else if (err.status === 500) {

        Notify.add("Oops! Server error :( Try again later!");

      } else if (~[2, 3, 5].indexOf(err.type)) {
        // nothing (https://github.com/angular-ui/ui-router/blob/master/src/transition/rejectFactory.ts)
      } else {
          Notify.add("Oops! Unknown error! Try again later!");
      }

    }

  }

  return new Service();

};
