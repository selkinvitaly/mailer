"use strict";

import template from "./template.html";
import "./style.styl";

export default {
  template: template,
  bindings: {
    shownRemoveBtn: "< existSelection",
    isSelectedAll: "<",
    isEmpty: "<",
    selectHandler: "& chooseAllHandler",
    removeHandler: "&"
  },
  controller: function($state, $rootScope, LettersApi, CacheDB) {
    "ngInject";

    Object.defineProperty(this, "loading", {
      get: function() {
        return LettersApi.loading;
      }
    });

    Object.defineProperty(this, "removing", {
      get: function() {
        return LettersApi.removing;
      }
    });

    this.refreshHandler = () => {
      CacheDB.clear();
      $state.reload();
    };

    this.cleanupHandler = () => {
      $rootScope.$emit("modal.cleanup.open");
    };

  }
};
