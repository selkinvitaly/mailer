"use strict";

import template from "./template.html";
import "./style.styl";

export default {
  template: template,
  controller: function(LettersApi, ErrorHandler, MailboxesStore, Notify, LettersStore, $element, $state, $rootScope) {
    "ngInject";

    this.newLetter = {
      subject: null,
      to: null,
      body: null,
      mailbox: null
    };

    Object.defineProperty(this, "loading", {
      get: function() {
        return LettersApi.loading;
      }
    });

    Object.defineProperty(this, "mailboxes", {
      get: function() {
        return MailboxesStore.data;
      }
    });

    $rootScope.$on("modal.write.open", () => this.open());

    this.close = () => {
      $element.removeClass("w-write_opened");
      $element.off("click");
    };

    this.open = () => {
      $element.addClass("w-write_opened");
      $element.on("click", () => this.close());
    };

    this.preventBubbling = e => e.stopPropagation();

    this.submitHandler = () => {
      LettersApi.create(this.newLetter)
        .then(() => {

          this.close();
          this.newLetter = {};
          Notify.add("The letter was successfully created!");
          $state.reload();

        }, err => {
          this.close();

          ErrorHandler.handle(err);
        });
    };

  }
};
