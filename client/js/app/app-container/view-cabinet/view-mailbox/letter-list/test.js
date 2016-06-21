"use strict";

describe("letterList component", function() {
  let componentController, componentElement, LettersStore;

  angular.mock.module.sharedInjector();

  before(angular.mock.module("app"));

  before(angular.mock.module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  before(angular.mock.inject(function($compile, $rootScope, _LettersStore_) {
    let parentScope = $rootScope.$new();
    let element = angular.element(`<letter-list class="w-letters" />`);
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

  it("'isSelected' should call LettersStore service", function() {
    sinon.stub(LettersStore, "isSelected");

    let fakeId = 123;

    componentController.isSelected(fakeId);

    assert.isTrue(LettersStore.isSelected.calledWithExactly(fakeId));

    LettersStore.isSelected.restore();
  });

  it("'chooseHandler' should call LettersStore service", function() {
    sinon.stub(LettersStore, "toggleSelect");

    let fakeId = 123;

    componentController.chooseHandler(fakeId);

    assert.isTrue(LettersStore.toggleSelect.calledWithExactly(fakeId));

    LettersStore.toggleSelect.restore();
  });

});
