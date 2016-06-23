"use strict";

import template from "./template.html";
import "./style.styl";

export default {
  bindings: {
    letter: "<"
  },
  controller: function(LettersApi) {
    "ngInject";

    Object.defineProperty(this, "loading", {
      get: function() {
        return LettersApi.loading;
      }
    });

    Object.defineProperty(this, "removing", {
      get: function() {
        return LettersApi.removing;
      }
    });

    this.formatDate = date => {

      if (!date) return "Wait...";

      const ONE_DAY = 24 * 3600 * 1000;

      let created = new Date(date);
      let now = new Date();

      let formatter = ((now - created) < ONE_DAY)
        ? new Intl.DateTimeFormat("ru", { hour: "numeric", minute: "numeric" })
        : new Intl.DateTimeFormat("ru", { day: "numeric", month: "numeric", year: "numeric" });

      return formatter.format(created);
    };

  },
  template: template
};
