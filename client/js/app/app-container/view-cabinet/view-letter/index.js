"use strict";

import template from "./template.html";

export default {
  template: template,
  controller: function(LettersApi, MailboxesStore, $stateParams, $state, ErrorHandler, Notify) {
    "ngInject";

    this.letter = null;

    this.fetchLetter = letterid => {
      return LettersApi
        .getById(letterid)
        .then(letter => (this.letter = letter), err => ErrorHandler.handle(err));
    };

    this.removeHandler = id => LettersApi
      .removeById(id)
      .then(() => {
        let mailboxid = MailboxesStore.selected;

        Notify.add("You removed this letter!");

        $state.go("cabinet.mailbox", { mailboxid:  mailboxid, page: null }, { reload: true });
      }, err => {
        ErrorHandler.handle(err);
      });

    this.fetchLetter($stateParams.letterid); // init

  }

};
