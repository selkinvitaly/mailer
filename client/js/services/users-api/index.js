"use strict";

const BASE_API = APP_CONF.baseApi;

export default function($http, $q, CacheDB) {
  "ngInject";

  class API {
    constructor() {
      this.loading = false;
      this.removing = false;
    }

    getById(userid) {
      const CACHE_KEY = `user-by-id:${userid}`;

      let Model = CacheDB.get(CACHE_KEY);

      if (Model && !Model.hasBeen("5m")) {
        return $q.resolve(Model.data);
      };

      this.loading = true;

      return $http.get(`${BASE_API}/users/${userid}`)
        .then(res => res.data)
        .then(user => {
          this.loading = false;
          CacheDB.add(CACHE_KEY, user);

          return user;
        }, err => {
          this.loading = false;

          throw err;
        });
    }

    getUsers(offset, limit) {
      this.loading = true;

      return $http.get(`${BASE_API}/users?offset=${offset}&limit=${limit}`)
        .then(res => res.data)
        .then(users => {
          this.loading = false;

          return users;
        }, err => {
          this.loading = false;

          throw err;
        });
    }

    removeById(userid) {
      this.removing = true;

      return $http.delete(`${BASE_API}/users/${userid}`)
        .then(res => {
          this.removing = false;

          CacheDB.remove(`user-by-id:${userid}`);
        }, err => {
          this.removing = false;

          throw err;
        });
    }

  }

  return new API();

};
