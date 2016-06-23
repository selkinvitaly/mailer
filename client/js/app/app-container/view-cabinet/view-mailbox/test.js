"use strict";

describe("viewMailbox component", function() {
  let componentController, componentElement, MailboxesStore, LettersApi;

  angular.mock.module.sharedInjector();

  before(angular.mock.module("app"));

  before(angular.mock.module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  before(angular.mock.inject(function($compile, $rootScope, _MailboxesStore_, _LettersApi_) {
    let parentScope = $rootScope.$new();
    let element = angular.element(`<view-mailbox class="v-mailbox" />`);
    let compiledElement = $compile(element)(parentScope);

    componentController = compiledElement.isolateScope().$ctrl;
    componentElement = element;
    MailboxesStore = _MailboxesStore_;
    LettersApi = _LettersApi_;
  }));

  it("shoulds methods and properties", function() {
    assert.isDefined(componentController.LIMIT);
    assert.isDefined(componentController.letters);
    assert.isDefined(componentController.selected);
    assert.isDefined(componentController.isEmpty);
    assert.isDefined(componentController.minOrder);
    assert.isDefined(componentController.maxOrder);
    assert.isDefined(componentController.total);
    assert.isDefined(componentController.existSelection);
    assert.isDefined(componentController.isSelectedAll);
  });

  it("'fetchLetters' should fetch letters", function() {
    sinon.stub(componentController, "_getOffsetByPage");
    sinon.stub(LettersApi, "getByMailbox").returns({ then: function() {} });

    componentController.fetchLetters();

    assert.isTrue(componentController._getOffsetByPage.called);
    assert.isTrue(LettersApi.getByMailbox.called);

    componentController._getOffsetByPage.restore();
    LettersApi.getByMailbox.restore();
  });

  it("'removeHandler' should call LettersApi service", function() {
    sinon.stub(LettersApi, "removeMoreById").returns({ then: function() {} });

    componentController.removeHandler();

    assert.isTrue(LettersApi.removeMoreById.called);

    LettersApi.removeMoreById.restore();
  });

  it("'chooseHandler' should deselect item", function() {
    let fakeId = 124;

    sinon.stub(componentController, "isSelected").returns(true);
    sinon.stub(componentController, "_deselect");

    componentController.chooseHandler(124);

    assert.isTrue(componentController._deselect.calledWithExactly(fakeId));

    componentController.isSelected.restore();
    componentController._deselect.restore();
  });

  it("'chooseHandler' should select item", function() {
    let fakeId = 124;

    sinon.stub(componentController, "isSelected").returns(false);
    sinon.stub(componentController, "_select");

    componentController.chooseHandler(124);

    assert.isTrue(componentController._select.calledWithExactly(fakeId));

    componentController.isSelected.restore();
    componentController._select.restore();
  });

  it("'isSelected' should return true", function() {
    let fakeId = 124;

    componentController.selected = [fakeId];

    assert.isTrue(componentController.isSelected(124));
  });

  it("'chooseAllHandler' should deselect all letters", function() {
    componentController.letters = [124]
    componentController.selected = [124];

    componentController.chooseAllHandler();

    assert.lengthOf(componentController.selected, 0);
  });

  it("'chooseAllHandler' should select all letters", function() {
    componentController.letters = [124, 123]
    componentController.selected = [];

    componentController.chooseAllHandler();

    assert.lengthOf(componentController.selected, 2);
  });

  it("'_getOffsetByPage' should return offset", function() {
    componentController.LIMIT = 10;

    assert.strictEqual(componentController._getOffsetByPage(2), 10);
    assert.strictEqual(componentController._getOffsetByPage(3), 20);
  });

  it("'_deselect' should deselect letter", function() {
    let fakeId = 123;

    componentController.selected = [4646, fakeId, 253636];

    componentController._deselect(fakeId);

    assert.lengthOf(componentController.selected, 2);
  });

  it("'_select' should select letter", function() {
    let fakeId = 123;

    componentController.selected = [2424];

    componentController._select(fakeId);

    assert.lengthOf(componentController.selected, 2);
    assert.strictEqual(componentController.selected[1], fakeId);
  });

});
