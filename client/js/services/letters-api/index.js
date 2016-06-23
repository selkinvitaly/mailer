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
      const CACHE_KEY = `letter-by-id:${letterid}`;

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
      const CACHE_KEY = `letters-count`;

      let Model = CacheDB.get(CACHE_KEY);

      if (Model && !Model.hasBeen("5m")) {
        return $q.resolve(Model.data);
      }

      this.loading = true;

      return $http.get(`${BASE_API}/count_letters`)
        .then(res => {
          this.loading = false;

          CacheDB.add(CACHE_KEY, res.data);

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

        CacheDB.remove([
          "letters-count",
          /^letters-by-boxid/
        ]);

        return res.data;
      }, err => {
        this.loading = false;

        throw err;
      });
    }

    getByMailbox(boxid, offset, limit) {
      const CACHE_KEY = `letters-by-boxid:${boxid}:${offset}:${limit}`;

      let Model = CacheDB.get(CACHE_KEY);

      if (Model && !Model.hasBeen("30s")) {
        return $q.resolve(Model.data);
      }

      this.loading = true;

      return $http.get(`${BASE_API}/mailboxes/${boxid}/letters?offset=${offset}&limit=${limit}`)
        .then(res => res.data)
        .then(letters => {
          this.loading = false;

          CacheDB.add(CACHE_KEY, letters);

          return letters;
        }, err => {
          this.loading = false;

          throw err;
        });
    }

    removeById(letterid) {
      this.removing = true;

      return $http.delete(`${BASE_API}/letters/${letterid}`)
        .then(res => {
          this.removing = false;

          CacheDB.remove([
            "letters-count",
            /^letters-by-boxid/,
            `letter-by-id:${letterid}`
          ]);

          return res.data;
        }, err => {
          this.removing = false;

          throw err;
        });
    }

    removeMoreById(ids) {
      this.removing = true;

      return $http.delete(`${BASE_API}/letters`, {
        data: { deleteId: ids },
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => {
        let removedKeys = ids.map(id => `letter-by-id:${id}`);

        removedKeys.push("letters-count", /^letters-by-boxid/);
        CacheDB.remove(removedKeys);

        this.removing = false;

        return res.data;
      }, err => {
        this.removing = false;

        throw err;
      });

    }

    cleanMailbox(boxid) {
      this.removing = true;

      return $http.delete(`${BASE_API}/mailboxes/${boxid}/letters`)
        .then(res => {
          this.removing = false;

          CacheDB.remove([
            "letters-count",
            new RegExp(`^letters-by-boxid:${boxid}`),
            /^letter-by-id/
          ]);

          return res.data;
        }, err => {
          this.removing = false;

          throw err;
        });
    }


  }

  return new API();

};
