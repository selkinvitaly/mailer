"use strict";

describe("letterList component", function() {
  let componentController, componentElement, LettersApi;
  let fakeLetters = [];
  let fakeIsEmpty = "empty";
  let fakeIsSelected = function() {};
  let fakeChooseHandler = function() {};

  angular.mock.module.sharedInjector();

  before(angular.mock.module("app"));

  before(angular.mock.module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  before(angular.mock.inject(function($compile, $rootScope, _LettersApi_) {
    let parentScope = $rootScope.$new();

    parentScope.$ctrl = {
      letters: fakeLetters,
      isEmpty: fakeIsEmpty,
      isSelected: fakeIsSelected,
      chooseHandler: fakeChooseHandler
    };

    let element = angular.element(`<letter-list class="w-letters"
      letters="$ctrl.letters"
      is-empty="$ctrl.isEmpty"
      is-selected="$ctrl.isSelected"
      choose-handler="$ctrl.chooseHandler">
    </letter-list>`);
    let compiledElement = $compile(element)(parentScope);

    componentController = compiledElement.isolateScope().$ctrl;
    componentElement = element;
    LettersApi = _LettersApi_;
  }));

  it("should has bindings", function() {
    assert.strictEqual(componentController.letters, fakeLetters);
    assert.strictEqual(componentController.isEmpty, fakeIsEmpty);
    assert.strictEqual(componentController.isSelected, fakeIsSelected);
    assert.strictEqual(componentController.chooseHandler, fakeChooseHandler);
  });

  it("should format today date", function() {
    let testDate = new Date();
    let expectedMinutes = (testDate.getMinutes().toString().length === 2) && testDate.getMinutes() || "0" + testDate.getMinutes();
    let expectedFormat = `${testDate.getHours()}:${expectedMinutes}`;

    assert.strictEqual(componentController.formatDate(testDate), expectedFormat);
  });

  it("should format not today date", function() {
    let testDate = new Date(2000, 6, 20);

    assert.strictEqual(componentController.formatDate(testDate), "20.07.2000");
  });

});
