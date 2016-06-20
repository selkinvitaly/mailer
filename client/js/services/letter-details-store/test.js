"use strict";

let baseApi = APP_CONF.baseApi;

describe("LetterDetailsStore service", function() {
  let LetterDetailsStore;

  angular.mock.module.sharedInjector();

  before(angular.mock.module("app"));

  before(angular.mock.module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  before(angular.mock.inject(function(_LetterDetailsStore_) {
    LetterDetailsStore = _LetterDetailsStore_;
  }));

  it("should set data", function() {
    assert.isNull(LetterDetailsStore.data);

    LetterDetailsStore.set({});

    assert.isNotNull(LetterDetailsStore.data);
  });

  it("should set data", function() {
    assert.isNotNull(LetterDetailsStore.data);

    LetterDetailsStore.clear();

    assert.isNull(LetterDetailsStore.data);
  });

});
