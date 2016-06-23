"use strict";

describe("widgetMailboxes component", function() {
  let $rootScope, componentController, componentElement, MailboxesStore;

  angular.mock.module.sharedInjector();

  before(angular.mock.module("app"));

  before(angular.mock.module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  before(angular.mock.inject(function($compile, _$rootScope_, _MailboxesStore_) {
    let parentScope = _$rootScope_.$new();
    let element = angular.element(`<widget-mailboxes class="w-mailboxes" />`);
    let compiledElement = $compile(element)(parentScope);

    $rootScope = _$rootScope_;
    componentController = compiledElement.isolateScope().$ctrl;
    componentElement = element;
    MailboxesStore = _MailboxesStore_;
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

  it("'getCountById' should call MailboxesStore service", function() {
    sinon.stub(MailboxesStore, "getCountByMailbox");

    let fakeId = "test";

    componentController.getCountById(fakeId);

    assert.isTrue(MailboxesStore.getCountByMailbox.calledWithExactly(fakeId));

    MailboxesStore.getCountByMailbox.restore();
  });

});
