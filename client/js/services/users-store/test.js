"use strict";

let baseApi = APP_CONF.baseApi;

describe("UsersStore service", function() {
  let UsersStore;

  angular.mock.module.sharedInjector();

  before(angular.mock.module("app"));

  before(angular.mock.module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  before(angular.mock.inject(function(_UsersStore_) {
    UsersStore = _UsersStore_;
  }));

  it("should set data", function() {
    let testData = [1, 2, 3];

    UsersStore.set(testData);

    assert.deepEqual(UsersStore.data, testData);
  });

  it("should add users", function() {
    UsersStore.data = [1];

    UsersStore.add([2, 3, 4]);

    assert.deepEqual(UsersStore.data, [1, 2, 3, 4]);
  });

  it("should format bday", function() {
    let bday = new Date(2016, 6, 20);

    assert.strictEqual(UsersStore.formateBday(bday), "20.07.2016");
  });

  it("should clear store", function() {
    UsersStore.data = [1,2];
    UsersStore.wasInitialFetch = true;
    UsersStore.isFullyLoaded = true;
    UsersStore.shownManualLoading = false;

    UsersStore.clear();

    assert.lengthOf(UsersStore.data, 0);
    assert.isFalse(UsersStore.wasInitialFetch);
    assert.isFalse(UsersStore.isFullyLoaded);
    assert.isTrue(UsersStore.shownManualLoading);
  });

  it("should remove user", function() {
    let testUser = { _id: "123" };

    UsersStore.data = [testUser, {}];

    UsersStore.remove("123");

    assert.lengthOf(UsersStore.data, 1);
    assert.lengthOf(UsersStore.data.filter(item => item._id === "123"), 0);
  });

});
