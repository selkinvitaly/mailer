"use strict";

describe("widgetContactsActions component", function() {
  let $state, componentController, componentElement;

  angular.mock.module.sharedInjector();

  before(angular.mock.module("app"));

  before(angular.mock.module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  before(angular.mock.inject(function($compile, $rootScope, _$state_) {
    let parentScope = $rootScope.$new();
    let element = angular.element(`<widget-contacts-actions class="w-contacts-actions" />`);
    let compiledElement = $compile(element)(parentScope);

    componentController = compiledElement.isolateScope().$ctrl;
    componentElement = element;
    $state = _$state_;
  }));

  it("'refreshHandler' should reload state", function() {
    sinon.stub($state, "reload");

    componentController.refreshHandler();

    assert.isTrue($state.reload.called);

    $state.reload.restore();
  });

});
