"use strict";

describe("cabinetTabs component", function() {
  let componentController, componentElement, MailboxesStore;

  angular.mock.module.sharedInjector();

  before(angular.mock.module("app"));

  before(angular.mock.module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  before(angular.mock.inject(function($compile, $rootScope, _MailboxesStore_) {
    let parentScope = $rootScope.$new();
    let element = angular.element(`<cabinet-tabs class="w-tabs" />`);
    let compiledElement = $compile(element)(parentScope);

    componentController = compiledElement.isolateScope().$ctrl;
    componentElement = element;
    MailboxesStore = _MailboxesStore_;
  }));

  it("'getMailboxid' should call MailboxesStore service", function() {
    sinon.stub(MailboxesStore, "getByName");
    sinon.stub(MailboxesStore, "getByIndex").returns({ _id: "fake" });

    let fakeName = 123;

    componentController.getMailboxid(fakeName);

    assert.isTrue(MailboxesStore.getByName.calledWithExactly(fakeName));

    MailboxesStore.getByName.restore();
    MailboxesStore.getByIndex.restore();
  });

});
