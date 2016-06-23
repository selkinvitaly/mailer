"use strict";

export default function() {

  class Store {

    constructor() {
      this.LIMIT = 15;

      this.clear();
    }

    set(items) {
      this.data = items.slice();
    }

    add(itemsArray) {
      Array.prototype.push.apply(this.data, itemsArray);
    }

    remove(userid) {
      let data = this.data;

      for (let i = 0; i < data.length; i++) {
        if (data[i]._id !== userid) continue;

        data.splice(i, 1);
        return;
      }
    }

    clear() {
      this.data = [];
      this.wasInitialFetch = false;
      this.isFullyLoaded = false;
      this.shownManualLoading = true;
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
