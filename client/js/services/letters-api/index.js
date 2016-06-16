"use strict";

const BASE_API = APP_CONF.baseApi;

export default function($http, $q, CacheDB, $httpParamSerializerJQLike) {
  "ngInject";

  class API {
    constructor() {
      this.loading = false;
      this.removing = false;
    }

    getById(letterid) {
      const CACHE_KEY = `letters:${letterid}`;

      let Model = CacheDB.get(CACHE_KEY);

      if (Model && !Model.hasBeen("5m")) {
        return $q.resolve(Model.data);
      }

      this.loading = true;

      return $http.get(`${BASE_API}/letters/${letterid}`)
        .then(res => res.data)
        .then(letter => {
          this.loading = false;
          CacheDB.add(CACHE_KEY, letter);

          return letter;
        }, err => {
          this.loading = false;

          throw err;
        });
    }

    count() {
      this.loading = true;

      return $http.get(`${BASE_API}/count_letters`)
        .then(res => {
          this.loading = false;

          return res.data;
        }, err => {
          this.loading = false;

          throw err;
        });
    }

    create(data) {
      this.loading = true;

      return $http.post(`${BASE_API}/letters`, $httpParamSerializerJQLike(data), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        this.loading = false;

        return res.data;
      }, err => {
        this.loading = false;

        throw err;
      });
    }

    getByMailbox(boxid, offset, limit) {
      this.loading = true;

      return $http.get(`${BASE_API}/mailboxes/${boxid}/letters?offset=${offset}&limit=${limit}`)
        .then(res => res.data)
        .then(letters => {
          this.loading = false;

          return letters;
        }, err => {
          this.loading = false;

          throw err;
        });
    }

    removeById(letterid) {
      const CACHE_KEY = `letters:${letterid}`;

      this.removing = true;

      return $http.delete(`${BASE_API}/letters/${letterid}`)
        .then(res => {
          this.removing = false;
          CacheDB.remove(CACHE_KEY);
        }, err => {
          this.removing = false;

          throw err;
        });
    }

    removeMoreById(ids) {
      const CACHE_KEYS = ids.map(id => `letters:${id}`);

      this.removing = true;

      return $http.delete(`${BASE_API}/letters`, {
        data: { deleteId: ids },
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => {
        this.removing = false;
        CacheDB.remove(CACHE_KEYS);

        return res.data;
      }, err => {
        this.removing = false;

        throw err;
      });

    }


  }

  return new API();

};
