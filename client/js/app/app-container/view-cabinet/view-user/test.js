"use strict";

describe("viewUser component", function() {
  let componentController, componentElement, UsersApi;

  angular.mock.module.sharedInjector();

  before(angular.mock.module("app"));

  before(angular.mock.module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  before(angular.mock.inject(function($compile, $rootScope, _UsersApi_) {
    let parentScope = $rootScope.$new();
    let element = angular.element(`<view-user class="v-user" />`);
    let compiledElement = $compile(element)(parentScope);

    componentController = compiledElement.isolateScope().$ctrl;
    componentElement = element;
    UsersApi = _UsersApi_;
  }));

  it("'fetchUser' should call UsersApi service", function() {
    let fakeId = "123dfdf";

    sinon.stub(UsersApi, "getById").returns({ then: function() {} });

    componentController.fetchUser(fakeId);

    assert.isTrue(UsersApi.getById.calledWithExactly(fakeId));

    UsersApi.getById.restore();
  });

  it("'removeHandler' should call UsersApi service", function() {
    let fakeId = "123dfdf";

    sinon.stub(UsersApi, "removeById").returns({ then: function() {} });

    componentController.removeHandler(fakeId);

    assert.isTrue(UsersApi.removeById.calledWithExactly(fakeId));

    UsersApi.removeById.restore();
  });

});
