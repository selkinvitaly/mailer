"use strict";

export default function() {

  class Store {
    constructor() {
      this.data = [];
      this.selected = null;
    }

    getByName(title) {
      return this.data.filter(item => item.title === title)[0];
    }

    set(items) {
      this.data = items.slice();
    }

    getByIndex(num) {
      return this.data[num];
    }

    select(id) {
      this.selected = id;
    }

    resetSelection() {
      this.selected = null;
    }

    getCurrent() {
      return this.data.filter(item => item._id === this.selected)[0];
    }

  }

  return new Store();

};
