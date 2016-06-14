"use strict";

import cfg from "dev-cfg";

const BASE_API = cfg.baseApi;

export default function($http, $q, CacheDB) {
  "ngInject";

  class API {
    constructor() {
      this.loading = false;
    }

    getAll() {
      const CACHE_KEY = "mailboxes:all";

      let Model = CacheDB.get(CACHE_KEY);

      if (Model && !Model.hasBeen("1h")) {
        return $q.resolve(Model.data);
      }

      this.loading = true;

      return $http.get(`${BASE_API}/mailboxes`)
        .then(res => {
          let data = res.data;

          this.loading = false;
          CacheDB.add(CACHE_KEY, data);

          return data;
        }, err => {
            this.loading = false;

            throw err;
        });
    }

    cleanup(boxid) {
      this.removing = true;

      return $http.delete(`${BASE_API}/mailboxes/${boxid}/letters`)
        .then(res => {
          this.removing = false;

          return res.data;
        }, err => {
          this.removing = false;

          throw err;
        });
    }

  }

  return new API();

};
