"use strict";

describe("userList component", function() {
  let $window, componentController, componentElement, UsersApi, UsersStore;

  angular.mock.module.sharedInjector();

  before(angular.mock.module("app"));

  before(angular.mock.module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  before(angular.mock.inject(function($compile, $rootScope, _$window_, _UsersApi_, _UsersStore_) {
    let parentScope = $rootScope.$new();
    let element = angular.element(`<user-list class="w-users" />`);
    let compiledElement = $compile(element)(parentScope);

    componentController = compiledElement.isolateScope().$ctrl;
    componentElement = element;
    $window = _$window_;
    UsersApi = _UsersApi_;
    UsersStore = _UsersStore_;
  }));

  it("has methods", function() {
    assert.isFunction(componentController._getPositionBottomEdgeElem);
    assert.isFunction(componentController._getPositionBottomEdgeViewport);
    assert.isFunction(componentController.startLazyLoading);
    assert.isFunction(componentController.scrollHandler);
    assert.isFunction(componentController.initialFetch);
  });

  it("'$onDestroy' hook should remove event listener", function() {
    sinon.stub($window, "removeEventListener");

    componentController.$onDestroy();

    assert.isTrue($window.removeEventListener.calledWithExactly("scroll", componentController.scrollHandler));

    $window.removeEventListener.restore();
  });

  it("'finishLazyLoading' should remove event listener", function() {
    sinon.stub($window, "removeEventListener");

    componentController.finishLazyLoading();

    assert.isTrue($window.removeEventListener.calledWithExactly("scroll", componentController.scrollHandler));

    $window.removeEventListener.restore();
  });

  it("'abortLazyLoading' should remove event listener", function() {
    sinon.stub($window, "removeEventListener");

    componentController.abortLazyLoading();

    assert.isTrue($window.removeEventListener.calledWithExactly("scroll", componentController.scrollHandler));

    $window.removeEventListener.restore();
  });

  it("'formatBday' should call UsersStore service", function() {
    sinon.stub(UsersStore, "formateBday");

    let fakeDate = new Date();

    componentController.formatBday(fakeDate);

    assert.isTrue(UsersStore.formateBday.calledWithExactly(fakeDate));

    UsersStore.formateBday.restore();
  });

});
