"use strict";

describe("widgetLetterActions component", function() {
  let componentController, componentElement;
  let fakeParentRemoveHandler = sinon.stub();
  let fakeLetter = { _id: 123 };

  angular.mock.module.sharedInjector();

  before(angular.mock.module("app"));

  before(angular.mock.module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  before(angular.mock.inject(function($compile, $rootScope) {
    let parentScope = $rootScope.$new();

    parentScope.$ctrl = {
      letter: fakeLetter,
      removeHandler: fakeParentRemoveHandler
    };

    let element = angular.element(`<widget-letter-actions remove-handler="$ctrl.removeHandler($ctrl.letter._id)" class="w-mailbox-actions" />`);
    let compiledElement = $compile(element)(parentScope);

    componentController = compiledElement.isolateScope().$ctrl;
    componentElement = element;
  }));

  it("'removeHandler' should call parent method", function() {
    componentController.removeHandler();

    assert.isTrue(fakeParentRemoveHandler.calledWithExactly(fakeLetter._id));
  });

});
