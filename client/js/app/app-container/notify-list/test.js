"use strict";

describe("notifyList component", function() {
  let componentController, componentElement, Notify;

  angular.mock.module.sharedInjector();

  before(angular.mock.module("app"));

  before(angular.mock.module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  before(angular.mock.inject(function($rootScope, $compile, _Notify_) {
    let parentScope = $rootScope.$new();
    let element = angular.element(`<notify-list class="w-notify"></notify-list>`);
    let compiledElement = $compile(element)(parentScope);

    componentController = compiledElement.isolateScope().$ctrl;
    componentElement = element;
    Notify = _Notify_;
  }));

  it("'closeHandler' should call Notify service", function() {
    sinon.stub(Notify, "remove");

    componentController.closeHandler(123);

    assert.isTrue(Notify.remove.calledWithExactly(123));

    Notify.remove.restore();
  });

});
