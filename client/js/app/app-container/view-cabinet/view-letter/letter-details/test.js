"use strict";

describe("letterDetails component", function() {
  let componentController, componentElement, LettersStore;

  angular.mock.module.sharedInjector();

  before(angular.mock.module("app"));

  before(angular.mock.module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  before(angular.mock.inject(function($compile, $rootScope, _LettersStore_) {
    let parentScope = $rootScope.$new();

    parentScope.$ctrl = { letter: {} };

    let element = angular.element(`<letter-details class="letter-details" letter="$ctrl.letter" />`);
    let compiledElement = $compile(element)(parentScope);

    componentController = compiledElement.isolateScope().$ctrl;
    componentElement = element;
    LettersStore = _LettersStore_;
  }));

  it("'formatDate' should call LettersStore service", function() {
    sinon.stub(LettersStore, "formatDate");

    let fakeDate = new Date();

    componentController.formatDate(fakeDate);

    assert.isTrue(LettersStore.formatDate.calledWithExactly(fakeDate));

    LettersStore.formatDate.restore();
  });

});
