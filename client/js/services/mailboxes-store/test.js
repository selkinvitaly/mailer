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

  it("should return selected mailbox", function() {
    let testMailbox  = {_id: "testId"};
    let testData = [testMailbox, {}, {}];

    MailboxesStore.set(testData);
    MailboxesStore.resetSelection();

    MailboxesStore.select(testMailbox._id);

    assert.deepEqual(MailboxesStore.getCurrent(), testMailbox);
  });

});
