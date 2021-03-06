"use strict";

let baseApi = APP_CONF.baseApi;

describe("CacheDB service", function() {
  let CacheDB;

  angular.mock.module.sharedInjector();

  before(angular.mock.module("app"));

  before(angular.mock.module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  before(angular.mock.inject(function(_CacheDB_) {
    CacheDB = _CacheDB_;
  }));

  it("should store and retrieve the value", function() {
    let KEY = "TEST_SAVED";
    let VAL = "TEST_SAVED_V";

    CacheDB.add(KEY, VAL);

    assert.strictEqual(CacheDB.get(KEY).data, VAL);
  });

  it("should return model", function() {
    let KEY = "TEST_MODEL";
    let VAL = "TEST_MODEL_V";

    CacheDB.add(KEY, VAL);

    let model = CacheDB.get(KEY);

    assert.isFunction(model.hasBeen);
    assert.isFunction(model.isOlderThan);
    assert.isOk(model.data);
    assert.isOk(model.lastLoadTime);
  });

  it("should has corrected saved date of the value", function() {
    let KEY = "TEST_SAVED_TIME";
    let VAL = "TEST_SAVED_TIME_V";

    let expectedTime = +new Date();

    CacheDB.add(KEY, VAL);

    let inaccurancy = 3 * 1000; // 3 second
    let actualTime = CacheDB.get(KEY).lastLoadTime.valueOf();

    assert.approximately(actualTime, expectedTime, inaccurancy);
  });

  context("method 'remove'", function() {
    let KEY, KEY2, VAL, VAL2;

    beforeEach(function() {
      KEY = "REMOVE-BY-STR";
      VAL = "OOPS";
      KEY2 = "REMOVE-BY-STR2";
      VAL2 = "OOPS2";

      CacheDB.add(KEY, VAL);
    });

    it("should remove by string key", function() {
      CacheDB.remove(KEY);

      assert.isUndefined(CacheDB.get(KEY));
    });

    it("should remove by regexp key", function() {
      CacheDB.remove(/^REMOVE-BY/);

      assert.isUndefined(CacheDB.get(KEY));
    });

    it("should remove more then one value", function() {
      CacheDB.remove([KEY, /BY-STR2$/]);

      assert.isUndefined(CacheDB.get(KEY));
      assert.isUndefined(CacheDB.get(KEY2));
    });

  });

  context("method 'isOlderThan'", function() {
    let KEY = "TEST_IS_OLDER";
    let VAL = "TEST_IS_OLDER_V";

    beforeEach(function() {
      CacheDB.add(KEY, VAL);
    });

    afterEach(function() {
      CacheDB.remove(KEY);
    });

    it("the saved time is older than future time", function() {
      let delta = 5 * 60 * 1000; // 5 min
      let savedTime = CacheDB.get(KEY).lastLoadTime.valueOf();

      let futureTime = new Date(savedTime + delta);

      assert.isTrue(CacheDB.get(KEY).isOlderThan(futureTime));
    });

    it("the saved time is newer than past time", function() {
      let delta = 5 * 60 * 1000; // 5 min
      let savedTime = CacheDB.get(KEY).lastLoadTime.valueOf();

      let futureTime = new Date(savedTime - delta);

      assert.isFalse(CacheDB.get(KEY).isOlderThan(futureTime));
    });

  });

  context("method 'hasBeen'", function() {
    let KEY = "TEST_HAS_BEEN";
    let VAL = "TEST_HAS_BEEN_V";

    beforeEach(function() {
      CacheDB.add(KEY, VAL);
    });

    afterEach(function() {
      CacheDB.remove(KEY);
    });

    it("should return true after 5 minutes", function() {
      let model = CacheDB.get(KEY);
      let delta = 6 * 60 * 1000; // 6 min

      let pastTime = new Date(model.lastLoadTime.valueOf() - delta);

      model.lastLoadTime = pastTime; // rewrite to older time

      assert.isTrue(model.hasBeen("5m"));
    });

    it("should return false before 5 minutes", function() {
      let model = CacheDB.get(KEY);
      let delta = 3 * 60 * 1000; // 3 min

      let pastTime = new Date(model.lastLoadTime.valueOf() - delta);

      model.lastLoadTime = pastTime; // rewrite to older time

      assert.isFalse(model.hasBeen("5m"));
    });

    it("should return true after 30 seconds", function() {
      let model = CacheDB.get(KEY);
      let delta = 40 * 1000; // 40 sec

      let pastTime = new Date(model.lastLoadTime.valueOf() - delta);

      model.lastLoadTime = pastTime; // rewrite to older time

      assert.isTrue(model.hasBeen("30s"));
    });

    it("should return false before 30 seconds", function() {
      let model = CacheDB.get(KEY);
      let delta = 15 * 1000; // 15 sec

      let pastTime = new Date(model.lastLoadTime.valueOf() - delta);

      model.lastLoadTime = pastTime; // rewrite to older time

      assert.isFalse(model.hasBeen("15s"));
    });

    it("should return true after 5 hours", function() {
      let model = CacheDB.get(KEY);
      let delta = 6 * 3600 * 1000; // 6 hour

      let pastTime = new Date(model.lastLoadTime.valueOf() - delta);

      model.lastLoadTime = pastTime; // rewrite to older time

      assert.isTrue(model.hasBeen("5h"));
    });

    it("should return false before 5 hours", function() {
      let model = CacheDB.get(KEY);
      let delta = 3 * 3600 * 1000; // 3 hour

      let pastTime = new Date(model.lastLoadTime.valueOf() - delta);

      model.lastLoadTime = pastTime; // rewrite to older time

      assert.isFalse(model.hasBeen("5h"));
    });

    it("should return true after 5 days", function() {
      let model = CacheDB.get(KEY);
      let delta = 6 * 24 * 3600 * 1000; // 6 day

      let pastTime = new Date(model.lastLoadTime.valueOf() - delta);

      model.lastLoadTime = pastTime; // rewrite to older time

      assert.isTrue(model.hasBeen("5d"));
    });

    it("should return false before 5 days", function() {
      let model = CacheDB.get(KEY);
      let delta = 3 * 24 * 3600 * 1000; // 3 day

      let pastTime = new Date(model.lastLoadTime.valueOf() - delta);

      model.lastLoadTime = pastTime; // rewrite to older time

      assert.isFalse(model.hasBeen("5d"));
    });

  });

});
