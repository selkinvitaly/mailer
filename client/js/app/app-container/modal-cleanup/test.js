"use strict";

describe("modalCleanup component", function() {
  let componentController, componentElement, LettersApi;

  angular.mock.module.sharedInjector();

  before(angular.mock.module("app"));

  before(angular.mock.module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  before(angular.mock.inject(function($rootScope, $compile, _LettersApi_) {
    let parentScope = $rootScope.$new();
    let element = angular.element(`<modal-cleanup class="w-cleanup"></modal-cleanup>`);
    let compiledElement = $compile(element)(parentScope);

    componentController = compiledElement.isolateScope().$ctrl;
    componentElement = element;
    LettersApi = _LettersApi_;
  }));

  it("has methods and properties", function() {
    assert.isFunction(componentController.close);
    assert.isFunction(componentController.open);
    assert.isFunction(componentController.preventBubbling);
    assert.isFunction(componentController.yesHandler);
  });

  it("'open' method should add class", function() {
    assert.isFalse(componentElement.hasClass("w-cleanup_opened"));

    componentController.open();

    assert.isTrue(componentElement.hasClass("w-cleanup_opened"));
  });

  it("'close' method should remove class", function() {
    assert.isTrue(componentElement.hasClass("w-cleanup_opened"));

    componentController.close();

    assert.isFalse(componentElement.hasClass("w-cleanup_opened"));
  });

  it("'yesHandler' should call LettersApi service", function() {
    sinon.stub(LettersApi, "cleanMailbox").returns({ then: function() {} });

    componentController.yesHandler();

    assert.isTrue(LettersApi.cleanMailbox.called);

    LettersApi.cleanMailbox.restore();
  });

});
