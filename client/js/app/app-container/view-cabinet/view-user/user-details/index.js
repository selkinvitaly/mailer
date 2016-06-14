"use strict";

import template from "./template.html";
import "./style.styl";

export default {
  controller: function(UsersApi, UserDetailsStore, UsersStore) {
    "ngInject";

    Object.defineProperty(this, "user", {
      get: function() {
        return UserDetailsStore.data;
      }
    });

    Object.defineProperty(this, "loading", {
      get: function() {
        return UsersApi.loading;
      }
    });

    Object.defineProperty(this, "removing", {
      get: function() {
        return UsersApi.removing;
      }
    });

    this.formatDate = date => !date
      ? "Wait..."
      :  UsersStore.formateBday(date);

  },
  template: template
};
