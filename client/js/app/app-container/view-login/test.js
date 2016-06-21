"use strict";

describe("viewLogin component", function() {
  let componentController, componentElement, Auth;

  angular.mock.module.sharedInjector();

  before(angular.mock.module("app"));

  before(angular.mock.module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  before(angular.mock.inject(function($rootScope, $compile, _Auth_) {
    let parentScope = $rootScope.$new();
    let element = angular.element(`<view-login class="v-login" />`);
    let compiledElement = $compile(element)(parentScope);

    componentController = compiledElement.isolateScope().$ctrl;
    componentElement = element;
    Auth = _Auth_;
  }));

  it("'onSubmit' should call Auth service", function() {
    sinon.stub(Auth, "login").returns({ then: function() {} });

    let fakeEvent = { preventDefault: function() {} };
    let fakeEmail = "test-email";
    let fakePass = "test-password";

    componentController.email = fakeEmail;
    componentController.password = fakePass;
    componentController.onSubmit(fakeEvent);

    assert.isTrue(Auth.login.calledWithExactly(fakeEmail, fakePass));

    Auth.login.restore();
  });

});
