"use strict";

import template from "./template.html";
import "./style.styl";

export default {
  bindings: {
    letter: "<"
  },
  controller: function(LettersApi, LettersStore) {
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

    this.formatDate = date => !date
      ? "Wait..."
      :  LettersStore.formatDate(date);

  },
  template: template
};
