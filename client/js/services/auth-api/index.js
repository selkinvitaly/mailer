"use strict";

import cfg from "dev-cfg";

const BASE_API = cfg.baseApi;

export default function($q, $http, $httpParamSerializerJQLike) {
  "ngInject";

  class API {

    constructor() {
      this.loading = false;
    }

    logout() {
      this.loading = true;

      return $http.post(`${BASE_API}/logout`)
        .then(res => {
          this.loading = false;

          return res.data;
        }, err => {
          this.loading = false;

          throw err;
        });
    }

    login(email, password) {
      this.loading = true;

      let access = { email, password };

      return $http.post(`${BASE_API}/login`, $httpParamSerializerJQLike(access), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(res => {
          this.loading = false;

          return res.data;
        }, err => {
          this.loading = false;

          throw err;
        });
    }

  }

  return new API();

};
