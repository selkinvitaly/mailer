"use strict";

describe("widgetLetterActions component", function() {
  let componentController, componentElement, LettersApi;

  angular.mock.module.sharedInjector();

  before(angular.mock.module("app"));

  before(angular.mock.module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  before(angular.mock.inject(function($compile, $rootScope, _LettersApi_) {
    let parentScope = $rootScope.$new();
    let element = angular.element(`<widget-letter-actions class="w-letter-actions" />`);
    let compiledElement = $compile(element)(parentScope);

    componentController = compiledElement.isolateScope().$ctrl;
    componentElement = element;
    LettersApi = _LettersApi_;
  }));

  it("'removeHandler' should call LettersApi service", function() {
    sinon.stub(LettersApi, "removeById").returns({ then: function() {} });

    let fakeId = 123;

    componentController.removeHandler(fakeId);

    assert.isTrue(LettersApi.removeById.calledWithExactly(fakeId));

    LettersApi.removeById.restore();
  });

});
