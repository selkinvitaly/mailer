"use strict";

import template from "./template.html";
import "./style.styl";

export default {
  controller: function(Auth, $state, ErrorHandler) {
    "ngInject";

    this.email = null;
    this.password = null;

    Object.defineProperty(this, "disabled", {
      get: function() {
        return Auth.loading;
      }
    });

    Object.defineProperty(this, "label", {
      get: function() {
        return this.disabled ? "Loading..." : "Login";
      }
    });

    this.onSubmit = event => {
      event.preventDefault();

      Auth.login(this.email, this.password)
        .then(user => {
          $state.go("home");
        }, err => {
          ErrorHandler.handle(err);
        });
    };

  },
  template: template
};
