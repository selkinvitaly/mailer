"use strict";

import template from "./template.html";
import "./style.styl";

export default {
  controller: function(LettersApi, LettersStore) {
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
  },
  template: template
};
