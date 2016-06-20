"use strict";

let baseApi = APP_CONF.baseApi;

describe("LettersStore service", function() {
  let LettersStore;

  angular.mock.module.sharedInjector();

  before(angular.mock.module("app"));

  before(angular.mock.module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  before(angular.mock.inject(function(_LettersStore_) {
    LettersStore = _LettersStore_;
  }));

  it("should set data", function() {
    let testData = [1, 2, 3];

    LettersStore.set(testData);

    assert.deepEqual(LettersStore.data, testData);
  });

  it("should set count", function() {
    let testData = { "aafaf": 12, "sdsf": 1 };

    LettersStore.setCount(testData);

    assert.strictEqual(LettersStore.count, testData);
  });

  it("should return corrected 'offset' and 'limit'", function() {
    let testPage = 3;
    let testPage_2 = 4;
    let limit = LettersStore.LIMIT;
    let expected = { limit, offset: 2 * limit }
    let expected_2 = { limit, offset: 3 * limit }

    assert.deepEqual(LettersStore.getOffsetByPage(testPage), expected);
    assert.deepEqual(LettersStore.getOffsetByPage(testPage_2), expected_2);
  });

  it("should clear store", function() {
    let testCount = {"remove-key" : 12, "not-remove-key": 1 };
    let testData  = [1, 2, 3];

    LettersStore.set(testData);
    LettersStore.setCount(testCount);

    LettersStore.removeAll("remove-key");

    assert.lengthOf(LettersStore.data, 0);
    assert.isNull(LettersStore.count["remove-key"]);
    assert.isNotNull(LettersStore.count["not-remove-key"]);
  });

  it("should get count by mailbox", function() {
    let testCount = { "testMailboxId": 12 };

    LettersStore.setCount(testCount);

    assert.strictEqual(LettersStore.getCountByMailbox("testMailboxId"), 12);
    assert.strictEqual(LettersStore.getCountByMailbox("undefinedMailboxId"), 0);
  });

  it("should add selected id", function() {
    let testId = "121wsfsgs";

    LettersStore.selected = []; // clear

    LettersStore.select(testId);

    assert.lengthOf(LettersStore.selected, 1);
    assert.strictEqual(LettersStore.selected[0], testId);
  });

  it("should return true If letter is selected", function() {
    let testId = "121wsfsgs";

    assert.isTrue(LettersStore.isSelected(testId));
  });

  it("should deselect letter", function() {
    let testId = "121wsfsgs";

    LettersStore.deselect(testId);

    assert.isFalse(LettersStore.isSelected(testId));
  });

  it("should select all letters", function() {
    let testData = [1, 2, 3, 4, 5];

    LettersStore.selected = [];
    LettersStore.set(testData);

    LettersStore.selectAll();

    assert.lengthOf(LettersStore.selected, testData.length);
  });

  it("should return true If all letters are selected", function() {
    assert.isTrue(LettersStore.isSelectedAll());
  });

  it("should return selected array", function() {
    let testData = [{ _id: 1 }, { _id: 2 }, { _id: 3 }, { _id: 4 }];

    LettersStore.set(testData);
    LettersStore.selectAll();

    assert.deepEqual(LettersStore.getSelected(), [1, 2, 3, 4]);
  });

  it("should deselect all letters", function() {
    LettersStore.deselectAll();

    assert.lengthOf(LettersStore.selected, 0);
  });

  it("should format today date", function() {
    let testDate = new Date();
    let expectedMinutes = (testDate.getMinutes().toString().length === 2) && testDate.getMinutes() || "0" + testDate.getMinutes();
    let expectedFormat = `${testDate.getHours()}:${expectedMinutes}`;

    assert.strictEqual(LettersStore.formatDate(testDate), expectedFormat);
  });

  it("should format not today date", function() {
    let testDate = new Date(2000, 6, 20);

    assert.strictEqual(LettersStore.formatDate(testDate), "20.07.2000");
  });

  it("should toggle all", function() {
    sinon.spy(LettersStore, "deselectAll");
    sinon.spy(LettersStore, "selectAll");

    LettersStore.selected = [];

    LettersStore.toggleAll();
    assert.isTrue(LettersStore.selectAll.called);

    LettersStore.toggleAll();
    assert.isTrue(LettersStore.deselectAll.called);

    LettersStore.selectAll.restore();
    LettersStore.deselectAll.restore();
  });

  it("should toggle by id", function() {
    let testId = "12sfsgsg";

    sinon.spy(LettersStore, "deselect");
    sinon.spy(LettersStore, "select");

    LettersStore.selected = [];

    LettersStore.toggleSelect(testId);
    assert.isTrue(LettersStore.select.called);

    LettersStore.toggleSelect(testId);
    assert.isTrue(LettersStore.deselect.called);

    LettersStore.select.restore();
    LettersStore.deselect.restore();
  });

});
