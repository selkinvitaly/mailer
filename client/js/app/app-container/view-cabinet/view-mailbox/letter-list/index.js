"use strict";

import template from "./template.html";
import "./style.styl";

export default {
  controller: function(LettersApi, LettersStore, $stateParams, ErrorHandler) {
    "ngInject";

    Object.defineProperty(this, "letters", {
      get: function() {
        return LettersStore.data;
      }
    });

    Object.defineProperty(this, "loading", {
      get: function() {
        return LettersApi.loading;
      }
    });

    Object.defineProperty(this, "isEmpty", {
      get: function() {
        return !LettersStore.data.length;
      }
    });

    this.formatDate = date => LettersStore.formatDate(date);

    this.isSelected = id => LettersStore.isSelected(id);

    this.chooseHandler = id => LettersStore.toggleSelect(id);

    this.fetchLetters = () => {
      let boxid = $stateParams.mailboxid;
      let page = $stateParams.page || 1;

      let { limit, offset } = LettersStore.getOffsetByPage(page);

      return LettersApi
        .getByMailbox(boxid, offset, limit)
        .then(letters => LettersStore.set(letters), err => ErrorHandler.handle(err));
    };

    this.fetchLetters(); // init

  },
  template: template
};
