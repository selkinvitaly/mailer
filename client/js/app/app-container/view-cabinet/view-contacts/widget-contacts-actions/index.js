"use strict";

import template from "./template.html";
import "./style.styl";

export default {
  template: template,
  controller: function($state, UsersApi, CacheDB, UsersStore) {
    "ngInject";

    Object.defineProperty(this, "loading", {
      get: function() {
        return UsersApi.loading;
      }
    });

    this.refreshHandler = () => {
      CacheDB.clear();
      UsersStore.clear();
      $state.reload();
    };

  }
};
