"use strict";

import template from "./template.html";
import "./style.styl";

export default {
  template: template,
  controller: function(Notify, ErrorHandler, LettersApi, LettersStore, $state, $rootScope) {
    "ngInject";

    Object.defineProperty(this, "isSelectedAll", {
      get: function() {
        return LettersStore.isSelectedAll();
      }
    });

    Object.defineProperty(this, "shownRemoveBtn", {
      get: function() {
        return LettersStore.selected.length > 0;
      }
    });

    Object.defineProperty(this, "lettersExist", {
      get: function() {
        return LettersStore.data.length > 0;
      }
    });

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
      $state.reload();
    };

    this.selectHandler = () => {
      LettersStore.toggleAll();
    };

    this.cleanupHandler = () => {
      $rootScope.$emit("modal.cleanup.open");
    };

    this.removeHandler = () => {
      let selected = LettersStore.getSelected();

      LettersApi.removeMoreById(selected)
        .then(removedIds => {

          LettersStore.deselectAll()

          Notify.add("Removed!");

          $state.reload();
        }, err => {
          ErrorHandler.handle(err);
        });

    };

  }
};
