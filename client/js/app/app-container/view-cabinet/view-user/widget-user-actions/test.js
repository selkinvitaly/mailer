"use strict";

describe("widgetUserActions component", function() {
  let componentController, componentElement, UsersApi;
  let fakeParentRemoveHandler = sinon.stub();
  let fakeUser = { _id: 123 };

  angular.mock.module.sharedInjector();

  before(angular.mock.module("app"));

  before(angular.mock.module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  before(angular.mock.inject(function($compile, $rootScope, _UsersApi_) {
    let parentScope = $rootScope.$new();

    parentScope.$ctrl = {
      removeHandler: fakeParentRemoveHandler,
      user: fakeUser
    };

    let element = angular.element(`<widget-user-actions remove-handler="$ctrl.removeHandler($ctrl.user._id)" class="w-user-actions" />`);
    let compiledElement = $compile(element)(parentScope);

    componentController = compiledElement.isolateScope().$ctrl;
    componentElement = element;
    UsersApi = _UsersApi_;
  }));

  it("'removeHandler' should call parent method", function() {
    componentController.removeHandler();

    assert.isTrue(fakeParentRemoveHandler.calledWithExactly(fakeUser._id));
  });

});
