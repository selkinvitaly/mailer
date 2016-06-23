"use strict";

import template from "./template.html";

export default {
  template: template,
  controller: function($stateParams, $state, LettersApi, MailboxesStore, ErrorHandler, Notify) {
    "ngInject";

    this.LIMIT = 10;

    this.letters = [];
    this.selected = [];

    Object.defineProperty(this, "isEmpty", {
      get: function() {
        return !this.letters.length;
      }
    });

    Object.defineProperty(this, "minOrder", {
      get: function() {
        if (this.isEmpty) return 0;

        let page = $stateParams.page || 1;

        return this.LIMIT * (page - 1) + 1;
      }
    });

    Object.defineProperty(this, "maxOrder", {
      get: function() {
        let count = this.letters.length || 1;

        return this.minOrder + count - 1;
      }
    });

    Object.defineProperty(this, "total", {
      get: function() {
        return MailboxesStore.getCountByMailbox(MailboxesStore.selected);
      }
    });

    Object.defineProperty(this, "existSelection", {
      get: function() {
        return this.selected.length > 0;
      }
    });

    Object.defineProperty(this, "isSelectedAll", {
      get: function() {
        return !this.isEmpty && (this.selected.length === this.letters.length);
      }
    });

    this.fetchLetters = () => {
      let boxid = $stateParams.mailboxid;
      let page = $stateParams.page || 1;

      let offset = this._getOffsetByPage(page);

      return LettersApi
        .getByMailbox(boxid, offset, this.LIMIT)
        .then(letters => (this.letters = letters), err => ErrorHandler.handle(err));
    };

    this.removeHandler = () => {
      let selectedLetters = this.selected.slice();

      LettersApi.removeMoreById(selectedLetters)
        .then(removedIds => {

          Notify.add("Removed!");

          $state.reload();
        }, err => {
          ErrorHandler.handle(err);
        });

    };

    this.chooseHandler = id => this.isSelected(id) ? this._deselect(id) : this._select(id);

    this.isSelected = id => !!~this.selected.indexOf(id);

    this.chooseAllHandler = () => {

      if (this.isSelectedAll) {
        this.selected = [];
      } else {
        this.selected = this.letters.map(item => item._id);
      }

    };

    this._getOffsetByPage = page => this.LIMIT * (page - 1);

    this._deselect = id => {
      let selectedLetters = this.selected;

      return selectedLetters.splice(selectedLetters.indexOf(id), 1);
    };

    this._select = id => this.selected.push(id);

    // init
    this.fetchLetters();
  }
};
