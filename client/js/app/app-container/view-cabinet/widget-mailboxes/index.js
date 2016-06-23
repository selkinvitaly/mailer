"use strict";

import template from "./template.html";
import "./style.styl";

export default {
  controller: function(MailboxesStore, $rootScope) {
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

    this.getCountById = id => MailboxesStore.getCountByMailbox(id);

  },
  template: template
};
