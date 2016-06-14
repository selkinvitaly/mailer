"use strict";

import template from "./template.html";
import "./style.styl";

export default {
  template: template,
  controller: function($state) {
    "ngInject";

    this.refreshHandler = () => {
      $state.reload();
    };

  }
};
