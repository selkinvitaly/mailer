"use strict";

import template from "./template.html";
import "./style.styl";

export default {
  controller: function(LettersStore, MailboxesStore, $rootScope) {
    "ngInject";

    Object.defineProperty(this, "mailboxes", {
      get: function() {
        return MailboxesStore.data;
      }
    });

    this.isSelected = id => id === MailboxesStore.selected;

    this.writeHandler = () => {
      $rootScope.$emit("modal.write.open");
    };

    this.getCountById = id => LettersStore.getCountByMailbox(id);

  },
  template: template
};
