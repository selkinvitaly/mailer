"use strict";

export default function() {

  class Store {
    constructor() {
      this.data = null;
    }

    set(letter) {
      return (this.data = letter);
    }

    clear() {
      this.data = null;
    }
  }

  return new Store();

};
