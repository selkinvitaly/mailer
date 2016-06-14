"use strict";

export default function() {

  class Store {
    constructor() {
      this.data = null;
    }

    set(user) {
      return (this.data = user);
    }

    clear() {
      this.data = null;
    }
  }

  return new Store();

};
