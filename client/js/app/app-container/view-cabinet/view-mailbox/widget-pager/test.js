"use strict";

describe("widgetPager component", function() {
  let componentController, componentElement;

  angular.mock.module.sharedInjector();

  before(angular.mock.module("app"));

  before(angular.mock.module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  before(angular.mock.inject(function($compile, $rootScope) {
    let parentScope = $rootScope.$new();
    let element = angular.element(`<widget-pager class="w-pager" />`);
    let compiledElement = $compile(element)(parentScope);

    componentController = compiledElement.isolateScope().$ctrl;
    componentElement = element;
  }));

  it("has next and prev handlers", function() {
    assert.isFunction(componentController.nextHandler);
    assert.isFunction(componentController.prevHandler);
  });

});
