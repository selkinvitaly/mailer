"use strict";

import template from "./template.html";
import "./style.styl";

export default {
  template: template,
  bindings: {
    removeHandler: "&"
  },
  controller: function(LettersApi) {
    "ngInject";

    Object.defineProperty(this, "removing", {
      get: function() {
        return LettersApi.removing;
      }
    });

    Object.defineProperty(this, "loading", {
      get: function() {
        return LettersApi.loading;
      }
    });

  }
};
