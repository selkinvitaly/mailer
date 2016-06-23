"use strict";

describe("widgetMailboxActions component", function() {
  let $rootScope, $state, componentController, componentElement, CacheDB;
  let fakeExistSelection = "existSelection";
  let fakeIsSelectedAll = "selectedAll";
  let fakeIsEmpty = "isEmpty";
  let fakeChooseAllHandler = sinon.stub();
  let fakeRemoveHandler = sinon.stub();

  angular.mock.module.sharedInjector();

  before(angular.mock.module("app"));

  before(angular.mock.module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  before(angular.mock.inject(function($compile, _$rootScope_, _$state_, _CacheDB_) {
    let parentScope = _$rootScope_.$new();

    parentScope.$ctrl = {
      existSelection: fakeExistSelection,
      isSelectedAll: fakeIsSelectedAll,
      isEmpty: fakeIsEmpty,
      chooseAllHandler: fakeChooseAllHandler,
      removeHandler: fakeRemoveHandler
    };

    let element = angular.element(`<widget-mailbox-actions class="w-mailbox-actions"
      exist-selection="$ctrl.existSelection"
      is-selected-all="$ctrl.isSelectedAll"
      is-empty="$ctrl.isEmpty"
      choose-all-handler="$ctrl.chooseAllHandler()"
      remove-handler="$ctrl.removeHandler()">
    </widget-mailbox-actions>`);
    let compiledElement = $compile(element)(parentScope);

    $rootScope = _$rootScope_;
    $state = _$state_;
    componentController = compiledElement.isolateScope().$ctrl;
    componentElement = element;
    CacheDB = _CacheDB_;
  }));

  it("should has bindings", function() {
    assert.strictEqual(componentController.shownRemoveBtn, fakeExistSelection);
    assert.strictEqual(componentController.isSelectedAll, fakeIsSelectedAll);
    assert.strictEqual(componentController.isEmpty, fakeIsEmpty);

    componentController.selectHandler();
    componentController.removeHandler();

    assert.isTrue(fakeChooseAllHandler.called);
    assert.isTrue(fakeRemoveHandler.called);
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

});
