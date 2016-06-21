"use strict";

describe("UserDetails component", function() {
  let componentController, componentElement, UsersStore;

  angular.mock.module.sharedInjector();

  before(angular.mock.module("app"));

  before(angular.mock.module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  before(angular.mock.inject(function($compile, $rootScope, _UsersStore_) {
    let parentScope = $rootScope.$new();
    let element = angular.element(`<user-details class="user-details" />`);
    let compiledElement = $compile(element)(parentScope);

    componentController = compiledElement.isolateScope().$ctrl;
    componentElement = element;
    UsersStore = _UsersStore_;
  }));

  it("'formatDate' should call UsersStore service", function() {
    sinon.stub(UsersStore, "formateBday");

    let fakeDate = new Date();

    componentController.formatDate(fakeDate);

    assert.isTrue(UsersStore.formateBday.calledWithExactly(fakeDate));

    UsersStore.formateBday.restore();
  });

});
