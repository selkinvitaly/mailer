"use strict";

describe("widgetMailboxes component", function() {
  let $rootScope, componentController, componentElement, LettersStore;

  angular.mock.module.sharedInjector();

  before(angular.mock.module("app"));

  before(angular.mock.module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  before(angular.mock.inject(function($compile, _$rootScope_, _LettersStore_) {
    let parentScope = _$rootScope_.$new();
    let element = angular.element(`<widget-mailboxes class="w-mailboxes" />`);
    let compiledElement = $compile(element)(parentScope);

    $rootScope = _$rootScope_;
    componentController = compiledElement.isolateScope().$ctrl;
    componentElement = element;
    LettersStore = _LettersStore_;
  }));

  it("should has method isSelected", function() {
    assert.isFunction(componentController.isSelected);
  });

  it("'writeHandler' should emit event", function() {
    sinon.stub($rootScope, "$emit");

    componentController.writeHandler();

    assert.isTrue($rootScope.$emit.calledWithExactly("modal.write.open"));

    $rootScope.$emit.restore();
  });

  it("'getCountById' should call LettersStore service", function() {
    sinon.stub(LettersStore, "getCountByMailbox");

    let fakeId = "test";

    componentController.getCountById(fakeId);

    assert.isTrue(LettersStore.getCountByMailbox.calledWithExactly(fakeId));

    LettersStore.getCountByMailbox.restore();
  });

});
