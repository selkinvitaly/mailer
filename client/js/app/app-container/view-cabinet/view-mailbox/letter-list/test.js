"use strict";

describe("letterList component", function() {
  let componentController, componentElement, LettersStore, LettersApi;

  angular.mock.module.sharedInjector();

  before(angular.mock.module("app"));

  before(angular.mock.module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  before(angular.mock.inject(function($compile, $rootScope, _LettersStore_, _LettersApi_) {
    let parentScope = $rootScope.$new();
    let element = angular.element(`<letter-list class="w-letters" />`);
    let compiledElement = $compile(element)(parentScope);

    componentController = compiledElement.isolateScope().$ctrl;
    componentElement = element;
    LettersStore = _LettersStore_;
    LettersApi = _LettersApi_;
  }));

  it("'fetchLetters' should fetch letters", function() {
    sinon.stub(LettersStore, "getOffsetByPage").returns({ limit: 10, offset: 5 });
    sinon.stub(LettersApi, "getByMailbox").returns({ then: function() {} });

    componentController.fetchLetters();

    assert.isTrue(LettersStore.getOffsetByPage.called);
    assert.isTrue(LettersApi.getByMailbox.called);

    LettersStore.getOffsetByPage.restore();
    LettersApi.getByMailbox.restore();
  });

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
