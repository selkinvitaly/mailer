"use strict";

describe("letterDetails component", function() {
  let componentController, componentElement;
  let fakeLetter = {};

  angular.mock.module.sharedInjector();

  before(angular.mock.module("app"));

  before(angular.mock.module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  before(angular.mock.inject(function($compile, $rootScope) {
    let parentScope = $rootScope.$new();

    parentScope.$ctrl = { letter: fakeLetter };

    let element = angular.element(`<letter-details class="letter-details" letter="$ctrl.letter" />`);
    let compiledElement = $compile(element)(parentScope);

    componentController = compiledElement.isolateScope().$ctrl;
    componentElement = element;
  }));

  it("should has bindings", function() {
    assert.strictEqual(componentController.letter, fakeLetter);
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
