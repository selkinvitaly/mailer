"use strict";

export default function() {

  class Store {

    constructor() {
      this.LIMIT = 15;

      this.data = [];
    }

    set(items) {
      this.data = items.slice();
    }

    add(itemsArray) {
      Array.prototype.push.apply(this.data, itemsArray);
    }

    formateBday(date) {
      let bday = new Date(date);

      let formatter = new Intl.DateTimeFormat("ru", {
        day: "numeric",
        month: "numeric",
        year: "numeric"
      });

      return formatter.format(bday);
    }

  }

  return new Store();

};
