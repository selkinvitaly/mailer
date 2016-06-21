"use strict";

describe("widgetLogout component", function() {
  let componentController, componentElement, Auth;

  angular.mock.module.sharedInjector();

  before(angular.mock.module("app"));

  before(angular.mock.module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  before(angular.mock.inject(function($compile, $rootScope, _Auth_) {
    let parentScope = $rootScope.$new();
    let element = angular.element(`<widget-logout class="w-logout" />`);
    let compiledElement = $compile(element)(parentScope);

    componentController = compiledElement.isolateScope().$ctrl;
    componentElement = element;
    Auth = _Auth_;
  }));

  it("'logoutHandler' should call Auth service", function() {
    sinon.stub(Auth, "logout").returns({ then: function() {} });

    componentController.logoutHandler();

    assert.isTrue(Auth.logout.called);

    Auth.logout.restore();
  });

});
