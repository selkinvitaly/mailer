"use strict";

export default function() {

  class Store {
    constructor() {
      this.data = [];
      this.selected = null;
      this.count = {};
    }

    setCount(countData) {
      this.count = countData;
    }

    getCountByMailbox(boxid) {
      return this.count[boxid] || 0;
    }

    clearCountByMailbox(mailboxid) {
      this.count[mailboxid] = null;
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

  }

  return new Store();

};
