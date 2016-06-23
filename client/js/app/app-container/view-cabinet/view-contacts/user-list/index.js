"use strict";

import template from "./template.html";
import "./style.styl";

export default {
  controller: function(ErrorHandler, UsersApi, UsersStore, $window, $element) {
    "ngInject";

    this.$onDestroy = () => {
      $window.removeEventListener("scroll", this.scrollHandler);

      !this.isFullyLoaded && (this.shownManualLoading = true);
    };

    Object.defineProperty(this, "shownManualLoading", {
      get: function() {
        return UsersStore.shownManualLoading;
      },
      set: function(bool) {
        UsersStore.shownManualLoading = bool;
      }
    });

    Object.defineProperty(this, "isFullyLoaded", {
      get: function() {
        return UsersStore.isFullyLoaded;
      },
      set: function(bool) {
        UsersStore.isFullyLoaded = bool;
      }
    });

    Object.defineProperty(this, "wasInitialFetch", {
      get: function() {
        return UsersStore.wasInitialFetch;
      },
      set: function(bool) {
        UsersStore.wasInitialFetch = bool;
      }
    });

    Object.defineProperty(this, "loading", {
      get: function() {
        return UsersApi.loading;
      }
    });

    Object.defineProperty(this, "users", {
      get: function() {
        return UsersStore.data;
      }
    });

    Object.defineProperty(this, "isEmpty", {
      get: function() {
        return !UsersStore.data.length;
      }
    });

    Object.defineProperty(this, "limit", {
      get: function() {
        return UsersStore.LIMIT;
      }
    });

    this._getPositionBottomEdgeElem = elem => {
      let box = elem.getBoundingClientRect();

      return box.top + $window.pageYOffset + elem.offsetHeight;
    };

    this._getPositionBottomEdgeViewport = () => $window.document.documentElement.clientHeight + $window.pageYOffset;

    this.scrollHandler = e => {
      const DELTA_POSITION = 20;

      if (this.loading) return;

      let listElem = $element[0].querySelector(".w-users-lst");
      let listElemPos = this._getPositionBottomEdgeElem(listElem);
      let viewportPos = this._getPositionBottomEdgeViewport();

      if ((listElemPos - DELTA_POSITION) >= viewportPos) return;

      UsersApi.getUsers(this.users.length, this.limit)
        .then(users => {

          UsersStore.add(users);

          if (users.length < this.limit) {
            this.finishLazyLoading();
          }
        }, err => {
          this.abortLazyLoading();
          ErrorHandler.handle(err);
        });

    };

    this.finishLazyLoading = () => {
      $window.removeEventListener("scroll", this.scrollHandler);

      this.shownManualLoading = false;
      this.isFullyLoaded = true;
    };

    this.abortLazyLoading = () => {
      $window.removeEventListener("scroll", this.scrollHandler);

      this.shownManualLoading = true;
    };

    this.startLazyLoading = () => {
      if (this.limit > this.users.length) return;

      $window.addEventListener("scroll", this.scrollHandler);

      this.shownManualLoading = false;

      this.scrollHandler();
    };

    this.initialFetch = () => {
      return UsersApi
        .getUsers(0, this.limit)
        .then(users => {
          this.wasInitialFetch = true;

          UsersStore.set(users);
        }, err => ErrorHandler.handle(err));
    };

    this.formatBday = date => UsersStore.formateBday(date);

    !this.wasInitialFetch && this.initialFetch(); // init

  },
  template: template
};
