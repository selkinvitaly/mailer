"use strict";

import template from "./template.html";
import "./style.styl";

export default {
  template: template,
  bindings: {
    removeHandler: "&"
  },
  controller: function(UsersApi, UsersStore) {
    "ngInject";

    Object.defineProperty(this, "removing", {
      get: function() {
        return UsersApi.removing;
      }
    });

    Object.defineProperty(this, "loading", {
      get: function() {
        return UsersApi.loading;
      }
    });

  }
};
