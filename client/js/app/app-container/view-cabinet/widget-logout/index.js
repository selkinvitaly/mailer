"use strict";

import template from "./template.html";
import "./style.styl";

export default {
  template: template,
  controller: function(Auth, $state, Notify, ErrorHandler) {
    "ngInject";

    Object.defineProperty(this, "loading", {
      get: function() {
        return Auth.loading;
      }
    });

    Object.defineProperty(this, "label", {
      get: function() {
        return this.loading ? "Wait..." : "Logout!";
      }
    });

    this.logoutHandler = () => {
      Auth.logout()
        .then(res => {
          Notify.add("You've signed out!");
          $state.go("login");
        }, err => {
          ErrorHandler.handle(err);
        });
    };

  }
};
