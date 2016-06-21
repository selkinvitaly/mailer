"use strict";

describe("modalWrite component", function() {
  let componentController, componentElement, LettersApi;

  angular.mock.module.sharedInjector();

  before(angular.mock.module("app"));

  before(angular.mock.module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  before(angular.mock.inject(function($rootScope, $compile, _LettersApi_) {
    let parentScope = $rootScope.$new();
    let element = angular.element(`<modal-write class="w-write"></modal-write>`);
    let compiledElement = $compile(element)(parentScope);

    componentController = compiledElement.isolateScope().$ctrl;
    componentElement = element;
    LettersApi = _LettersApi_;
  }));

  it("has methods and properties", function() {
    assert.isFunction(componentController.close);
    assert.isFunction(componentController.open);
    assert.isFunction(componentController.preventBubbling);
    assert.isFunction(componentController.submitHandler);
  });

  it("'open' method should add class", function() {
    assert.isFalse(componentElement.hasClass("w-write_opened"));

    componentController.open();

    assert.isTrue(componentElement.hasClass("w-write_opened"));
  });

  it("'close' method should remove class", function() {
    assert.isTrue(componentElement.hasClass("w-write_opened"));

    componentController.close();

    assert.isFalse(componentElement.hasClass("w-write_opened"));
  });

  it("'submitHandler' should call LettersApi.create", function() {
    let testLetter = {};

    componentController.newLetter = testLetter; // fake letter
    sinon.stub(LettersApi, "create").returns({ then: function() {} });

    componentController.submitHandler();

    assert.isTrue(LettersApi.create.calledWithExactly(testLetter));

    LettersApi.create.restore();
  });

});
