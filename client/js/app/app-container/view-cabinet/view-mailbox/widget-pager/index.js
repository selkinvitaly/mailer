"use strict";

import template from "./template.html";
import "./style.styl";

export default {
  controller: function(LettersApi, LettersStore, MailboxesStore, $stateParams, $state) {
    "ngInject";

    const mailboxId = MailboxesStore.selected;

    Object.defineProperty(this, "loading", {
      get: function() {
        return LettersApi.loading;
      }
    });

    Object.defineProperty(this, "total", {
      get: function() {
        return LettersStore.getCountByMailbox(mailboxId);
      }
    });

    Object.defineProperty(this, "floorNum", {
      get: function() {
        let countLetters = LettersStore.data.length;

        if (!countLetters) return 0;

        let page = $stateParams.page || 1;
        let limit = LettersStore.LIMIT;

        return limit * (page - 1) + 1;
      }
    });

    Object.defineProperty(this, "ceilNum", {
      get: function() {
        let countLetters = LettersStore.data.length || 1;

        return this.floorNum + countLetters - 1;
      }
    });

    Object.defineProperty(this, "range", {
      get: function() {
        return `${this.floorNum} - ${this.ceilNum}`;
      }
    });

    Object.defineProperty(this, "prevIsDisabled", {
      get: function() {
        let floorNum = this.floorNum;

        return (floorNum === 1 || floorNum === 0);
      }
    });

    Object.defineProperty(this, "nextIsDisabled", {
      get: function() {
        let ceilNum = this.ceilNum;
        let total = this.total;

        return (ceilNum === 0) ? true : total === ceilNum;
      }
    });

    this.nextHandler = () => {
      if (this.nextIsDisabled) return;

      let mailboxid = $stateParams.mailboxid;
      let page = +$stateParams.page || 1;

      let newStateParams = {
        mailboxid: mailboxid,
        page: page + 1
      }

      $state.go($state.current.name, newStateParams);
    };

    this.prevHandler = () => {
      if (this.prevIsDisabled) return;

      let mailboxid = $stateParams.mailboxid;
      let page = +$stateParams.page || 1;

      let newStateParams = {
        mailboxid: mailboxid,
        page: page - 1
      }

      $state.go($state.current.name, newStateParams);
    };

  },
  template: template
};
