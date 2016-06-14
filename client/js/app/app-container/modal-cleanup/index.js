"use strict";

import template from "./template.html";
import "./style.styl";

export default {
  template: template,
  controller: function(MailboxesApi, ErrorHandler, MailboxesStore, Notify, LettersStore, $element, $state, $rootScope) {
    "ngInject";

    Object.defineProperty(this, "removing", {
      get: function() {
        return MailboxesApi.removing;
      }
    });

    $rootScope.$on("modal.cleanup.open", () => this.open());

    this.close = () => {
      $element.removeClass("w-cleanup_opened");
      $element.off("click");
    };

    this.open = () => {
      $element.addClass("w-cleanup_opened");
      $element.on("click", () => this.close());
    };

    this.preventBubbling = e => e.stopPropagation();

    this.yesHandler = () => {
      let selected = MailboxesStore.selected;

      MailboxesApi.cleanup(selected)
        .then(() => {

          LettersStore.deselectAll();
          LettersStore.removeAll(selected);
          this.close();
          Notify.add("The mailbox was successfully cleaned!");
          $state.reload();

        }, err => {
          this.close();

          ErrorHandler.handle(err);
        });
    };

  }
};
