"use strict";

import template from "./template.html";
import "./style.styl";

export default {
  template: template,
  controller: function($state, $stateParams, MailboxesStore) {
    "ngInject";

    Object.defineProperty(this, "isContacts", {
      get: function() {
        return !!~$state.current.url.indexOf("contacts");
      }
    });

    Object.defineProperty(this, "isLetters", {
      get: function() {
        return !!$stateParams.mailboxid;
      }
    });

    this.getMailboxid = boxname => {
      let foundMailbox = MailboxesStore.getByName(boxname);

      if (foundMailbox) {
        return foundMailbox._id;
      }

      return MailboxesStore.getByIndex(0) && MailboxesStore.getByIndex(0)._id;
    };

  }
};
