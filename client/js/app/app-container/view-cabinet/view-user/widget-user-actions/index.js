"use strict";

import template from "./template.html";
import "./style.styl";

export default {
  template: template,
  controller: function(Notify, ErrorHandler, UsersApi, $state, UserDetailsStore) {
    "ngInject";

    Object.defineProperty(this, "removing", {
      get: function() {
        return UsersApi.removing;
      }
    });

    Object.defineProperty(this, "user", {
      get: function() {
        return UserDetailsStore.data;
      }
    });

    this.removeHandler = id => UsersApi
      .removeById(id)
      .then(() => {
        UserDetailsStore.clear();

        Notify.add("Removed!");

        $state.go("cabinet.contacts", { reload: true });
      }, err => {

        ErrorHandler.handle(err);
      });

  }
};
