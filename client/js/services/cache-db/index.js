"use strict";

export default function() {

  class Model {
    constructor(data) {
      this.lastLoadTime = new Date();
      this.data = data;
    }

    // template examples:
    // "5m"-minutes, "5h"-hours, "5s"-seconds, "5d"-days
    hasBeen(template) {
      const REXP = /([1-9])+([mhsd])/;

      if (typeof template !== "string") {
        throw new Error("passed template must be string");
      }

      if (!REXP.test(template)) {
        throw new Error("you passed invalid template");
      }

      let count = +template.match(REXP)[1];
      let type = template.match(REXP)[2];
      let compared = null;

      switch (type) {
        case "m":
          compared = new Date(this.lastLoadTime).setMinutes(this.lastLoadTime.getMinutes() + count);

          return Date.now() > compared;

        case "h":
          compared = new Date(this.lastLoadTime).setHours(this.lastLoadTime.getHours() + count);

          return Date.now() > compared;

        case "s":
          compared = new Date(this.lastLoadTime).setSeconds(this.lastLoadTime.getSeconds() + count);

          return Date.now() > compared;

        case "d":
          compared = new Date(this.lastLoadTime).setDate(this.lastLoadTime.getDate() + count);

          return Date.now() > compared;
      }

    }

    isOlderThan(comparedDate) {
      return comparedDate > this.lastLoadTime;
    }
  }

  class DB {
    constructor() {
      this.data = {};
    }

    add(key, value) {
      return (this.data[key] = new Model(value));
    }

    remove(key) {
      if (!isArray(key)) return delete this.data[key];

      key.forEach(item => {
        delete this.data[item];
      });
    }

    get(key) {
      return this.data[key];
    }

  }

  function isArray(obj) {
    return Object.prototype.toString
      .call(obj)
      .slice(8, -1)
      .toLowerCase() === "array";
  }

  return new DB();
};
