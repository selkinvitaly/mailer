"use strict";

describe("UserDetails component", function() {
  let componentController, componentElement, UsersStore;
  let fakeUser = {};

  angular.mock.module.sharedInjector();

  before(angular.mock.module("app"));

  before(angular.mock.module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  before(angular.mock.inject(function($compile, $rootScope, _UsersStore_) {
    let parentScope = $rootScope.$new();

    parentScope.$ctrl = { user: fakeUser };

    let element = angular.element(`<user-details user="$ctrl.user" class="user-details" />`);
    let compiledElement = $compile(element)(parentScope);

    componentController = compiledElement.isolateScope().$ctrl;
    componentElement = element;
    UsersStore = _UsersStore_;
  }));

  it("should has bindings", function() {
    assert.strictEqual(componentController.user, fakeUser);
  });

  it("'formatDate' should call UsersStore service", function() {
    sinon.stub(UsersStore, "formateBday");

    let fakeDate = new Date();

    componentController.formatDate(fakeDate);

    assert.isTrue(UsersStore.formateBday.calledWithExactly(fakeDate));

    UsersStore.formateBday.restore();
  });

});
