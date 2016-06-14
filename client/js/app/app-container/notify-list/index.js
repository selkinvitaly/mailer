"use strict";

import template from "./template.html";
import "./style.styl";

export default {
  controller: function(Notify) {
    "ngInject";

    Object.defineProperty(this, "notifications", {
      get: function() {
        return Notify.notice;
      }
    });

    this.closeHandler = id => {
      Notify.remove(id);
    };

  },
  template: template
};
