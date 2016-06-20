"use strict";

let baseApi = APP_CONF.baseApi;

describe("UserDetailsStore service", function() {
  let UserDetailsStore;

  angular.mock.module.sharedInjector();

  before(angular.mock.module("app"));

  before(angular.mock.module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  before(angular.mock.inject(function(_UserDetailsStore_) {
    UserDetailsStore = _UserDetailsStore_;
  }));

  it("should set data", function() {
    let testUser = { id: "testId" };

    UserDetailsStore.set(testUser);

    assert.deepEqual(UserDetailsStore.data, testUser);
  });

  it("should clear data", function() {
    UserDetailsStore.set({});

    UserDetailsStore.clear();

    assert.isNull(UserDetailsStore.data);
  });

});
