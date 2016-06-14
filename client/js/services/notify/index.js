"use strict";

export default function($timeout) {
  "ngInject";

  class Notice {
    constructor(message, ms) {
      this.id = Date.now();
      this.message = message;
      this.timeout = ms || 5000;
    }
  }

  class Service {
    constructor() {
      this.notice = [];
    }

    add(message, ms) {
      let newNotice = new Notice(message, ms);

      this.notice.push(newNotice);

      $timeout(this.remove.bind(this, newNotice.id), newNotice.timeout);

      return newNotice;
    }

    remove(id) {
      for (let i = 0; i < this.notice.length; i++) {
        if (id !== this.notice[i].id) continue;

        return this.notice.splice(i, 1);
      }
    }

    clear() {
      this.notice.splice(0, this.notice.length);
    }


  }

  return new Service();

};
