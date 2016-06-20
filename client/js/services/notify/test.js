"use strict";

let baseApi = APP_CONF.baseApi;

describe("Notify service", function() {
  let Notify;

  angular.mock.module.sharedInjector();

  before(angular.mock.module("app"));

  before(angular.mock.module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  before(angular.mock.inject(function(_Notify_) {
    Notify = _Notify_;
  }));

  it("should create new notification message", function() {
    Notify.add("test-message");

    assert.strictEqual(Notify.notice[0].message, "test-message");
  });

  it("should remove notice", function() {
    let testNotice = { id: "testId" };

    Notify.notice = [testNotice];

    Notify.remove(testNotice.id);

    assert.lengthOf(Notify.notice, 0);
  });

  it("should remove all notices", function() {
    Notify.notice = [{}, {}];

    Notify.clear();

    assert.lengthOf(Notify.notice, 0);
  });

});
