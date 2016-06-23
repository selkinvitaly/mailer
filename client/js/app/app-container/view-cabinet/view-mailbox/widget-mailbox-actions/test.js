"use strict";

describe("widgetMailboxActions component", function() {
  let $rootScope, $state, componentController, componentElement, LettersStore, LettersApi, CacheDB;

  angular.mock.module.sharedInjector();

  before(angular.mock.module("app"));

  before(angular.mock.module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  before(angular.mock.inject(function($compile, _$rootScope_, _$state_, _LettersStore_, _LettersApi_, _CacheDB_) {
    let parentScope = _$rootScope_.$new();
    let element = angular.element(`<widget-mailbox-actions class="w-mailbox-actions" />`);
    let compiledElement = $compile(element)(parentScope);

    $rootScope = _$rootScope_;
    $state = _$state_;
    componentController = compiledElement.isolateScope().$ctrl;
    componentElement = element;
    LettersStore = _LettersStore_;
    LettersApi = _LettersApi_;
    CacheDB = _CacheDB_;
  }));

  it("'selectHandler' should call LettersStore service", function() {
    sinon.stub(LettersStore, "toggleAll");

    componentController.selectHandler();

    assert.isTrue(LettersStore.toggleAll.called);

    LettersStore.toggleAll.restore();
  });

  it("'refreshHandler' should reload state and clear cache", function() {
    sinon.stub($state, "reload");
    sinon.stub(CacheDB, "clear");

    componentController.refreshHandler();

    assert.isTrue($state.reload.called);
    assert.isTrue(CacheDB.clear.called);

    $state.reload.restore();
    CacheDB.clear.restore();
  });

  it("'cleanupHandler' should emit event", function() {
    sinon.stub($rootScope, "$emit");

    componentController.cleanupHandler();

    assert.isTrue($rootScope.$emit.calledWithExactly("modal.cleanup.open"));

    $rootScope.$emit.restore();
  });

  it("'removeHandler' should call LettersStore service", function() {
    sinon.stub(LettersApi, "removeMoreById").returns({ then: function() {} });

    componentController.removeHandler();

    assert.isTrue(LettersApi.removeMoreById.called);

    LettersApi.removeMoreById.restore();
  });

});
