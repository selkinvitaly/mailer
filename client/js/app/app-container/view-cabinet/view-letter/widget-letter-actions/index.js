"use strict";

import template from "./template.html";
import "./style.styl";

export default {
  template: template,
  controller: function(Notify, ErrorHandler, LettersApi, MailboxesStore, $state, LetterDetailsStore) {
    "ngInject";

    Object.defineProperty(this, "removing", {
      get: function() {
        return LettersApi.removing;
      }
    });

    Object.defineProperty(this, "letter", {
      get: function() {
        return LetterDetailsStore.data;
      }
    });

    this.removeHandler = id => LettersApi
      .removeById(id)
      .then(() => {
        let mailboxid = MailboxesStore.selected;

        LetterDetailsStore.clear();

        Notify.add("Removed!");

        $state.go("cabinet.mailbox", { mailboxid:  mailboxid, page: null }, { reload: true });
      }, err => {
        ErrorHandler.handle(err);
      });

  }
};
