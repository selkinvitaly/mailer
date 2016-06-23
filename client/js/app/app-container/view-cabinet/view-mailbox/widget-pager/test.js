"use strict";

describe("widgetPager component", function() {
  let componentController, componentElement;
  let fakeMinOrder = 1;
  let fakeMaxOrder = 6;
  let fakeTotal = 10;

  angular.mock.module.sharedInjector();

  before(angular.mock.module("app"));

  before(angular.mock.module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  before(angular.mock.inject(function($compile, $rootScope) {
    let parentScope = $rootScope.$new();

    parentScope.$ctrl = {
      minOrder: fakeMinOrder,
      maxOrder: fakeMaxOrder,
      total: fakeTotal
    };

    let element = angular.element(`<widget-pager class="w-pager" min-order="$ctrl.minOrder" max-order="$ctrl.maxOrder" total="$ctrl.total" />`);
    let compiledElement = $compile(element)(parentScope);

    componentController = compiledElement.isolateScope().$ctrl;
    componentElement = element;
  }));

  it("should has bindings", function() {
    assert.strictEqual(componentController.floorNum, fakeMinOrder);
    assert.strictEqual(componentController.ceilNum, fakeMaxOrder);
    assert.strictEqual(componentController.total, fakeTotal);
  });

  it("should has prev and next methods", function() {
    assert.isFunction(componentController.nextHandler);
    assert.isFunction(componentController.prevHandler);
  });

});
