"use strict";

let baseApi = APP_CONF.baseApi;

describe("MailboxesStore service", function() {
  let MailboxesStore;

  angular.mock.module.sharedInjector();

  before(angular.mock.module("app"));

  before(angular.mock.module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  before(angular.mock.inject(function(_MailboxesStore_) {
    MailboxesStore = _MailboxesStore_;
  }));

  it("should set and get count", function() {
    let fakeCount = {
      "31313sf": 12,
      "sdsdgs2": 2
    };

    MailboxesStore.setCount(fakeCount);

    assert.strictEqual(MailboxesStore.getCountByMailbox("31313sf"), 12);
    assert.strictEqual(MailboxesStore.getCountByMailbox("sdsdgs2"), 2);
    assert.strictEqual(MailboxesStore.getCountByMailbox("undefined"), 0);
  });

  it("should clear count by mailboxid", function() {
    MailboxesStore.clearCountByMailbox("31313sf");

    assert.isNull(MailboxesStore.count["31313sf"]);
  });

  it("should set data", function() {
    let testData = [1, 2, 3];

    MailboxesStore.set(testData);

    assert.deepEqual(MailboxesStore.data, testData);
  });

  it("should return mailbox by title", function() {
    let testMailbox = { title: "testName" };
    let testData = [testMailbox];

    MailboxesStore.set(testData);

    assert.deepEqual(MailboxesStore.getByName("testName"), testMailbox);
  });

  it("should return mailbox by index", function() {
    let testMailbox = { title: "testName" };
    let testData = [testMailbox, {}, {}];

    MailboxesStore.set(testData);

    assert.deepEqual(MailboxesStore.getByIndex(0), testMailbox);
  });

  it("should select mailbox", function() {
    let testId = "121sfg";

    MailboxesStore.selected = null;

    MailboxesStore.select(testId);

    assert.strictEqual(MailboxesStore.selected, testId);
  });

  it("should reset selection", function() {
    MailboxesStore.selected = "121efsg";

    MailboxesStore.resetSelection();

    assert.isNull(MailboxesStore.selected);
  });

});
