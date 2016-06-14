"use strict";

import template from "./template.html";
import "./style.styl";

export default {
  controller: function(LettersApi, LetterDetailsStore, LettersStore) {
    "ngInject";

    Object.defineProperty(this, "letter", {
      get: function() {
        return LetterDetailsStore.data;
      }
    });

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
