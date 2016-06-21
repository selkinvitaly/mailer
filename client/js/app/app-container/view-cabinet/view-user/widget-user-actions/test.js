"use strict";

describe("widgetUserActions component", function() {
  let componentController, componentElement, UsersApi;

  angular.mock.module.sharedInjector();

  before(angular.mock.module("app"));

  before(angular.mock.module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  before(angular.mock.inject(function($compile, $rootScope, _UsersApi_) {
    let parentScope = $rootScope.$new();
    let element = angular.element(`<widget-user-actions class="w-user-actions" />`);
    let compiledElement = $compile(element)(parentScope);

    componentController = compiledElement.isolateScope().$ctrl;
    componentElement = element;
    UsersApi = _UsersApi_;
  }));

  it("'removeHandler' should call UsersApi service", function() {
    sinon.stub(UsersApi, "removeById").returns({ then: function() {} });

    let fakeId = 123;

    componentController.removeHandler(fakeId);

    assert.isTrue(UsersApi.removeById.calledWithExactly(fakeId));

    UsersApi.removeById.restore();
  });

});
