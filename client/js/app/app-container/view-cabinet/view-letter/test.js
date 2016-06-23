"use strict";

describe("viewLetter component", function() {
  let componentController, componentElement, LettersApi;

  angular.mock.module.sharedInjector();

  before(angular.mock.module("app"));

  before(angular.mock.module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  before(angular.mock.inject(function($compile, $rootScope, _LettersApi_) {
    let parentScope = $rootScope.$new();
    let element = angular.element(`<view-letter class="v-letter" />`);
    let compiledElement = $compile(element)(parentScope);

    componentController = compiledElement.isolateScope().$ctrl;
    componentElement = element;
    LettersApi = _LettersApi_;
  }));

  it("'fetchLetter' should call LettersApi service", function() {
    let fakeId = "123dfdf";

    sinon.stub(LettersApi, "getById").returns({ then: function() {} });

    componentController.fetchLetter(fakeId);

    assert.isTrue(LettersApi.getById.calledWithExactly(fakeId));

    LettersApi.getById.restore();
  });

  it("'removeHandler' should call LettersApi service", function() {
    let fakeId = "123dfdf";

    sinon.stub(LettersApi, "removeById").returns({ then: function() {} });

    componentController.removeHandler(fakeId);

    assert.isTrue(LettersApi.removeById.calledWithExactly(fakeId));

    LettersApi.removeById.restore();
  });

});
