"use strict";

import template from "./template.html";

export default {
  template: template,
  controller: function($stateParams, $state, Notify, ErrorHandler, UsersApi, UsersStore) {
    "ngInject";

    this.user = null;

    this.fetchUser = userid => {
      return UsersApi
        .getById(userid)
        .then(user => (this.user = user), err => ErrorHandler.handle(err));
    };

    this.removeHandler = id => UsersApi
      .removeById(id)
      .then(() => {
        UsersStore.remove(id);

        Notify.add("You removed this user!");

        $state.go("cabinet.contacts", { reload: true });
      }, err => {
        ErrorHandler.handle(err);
      });

    this.fetchUser($stateParams.userid); // init
  }
};
