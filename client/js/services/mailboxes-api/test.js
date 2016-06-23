"use strict";

let baseApi = APP_CONF.baseApi;

describe("MailboxesApi service", function() {
  let MailboxesApi, CacheDB;

  angular.mock.module.sharedInjector();

  before(angular.mock.module("app"));

  before(angular.mock.module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  before(angular.mock.inject(function(_MailboxesApi_, _CacheDB_) {
    MailboxesApi = _MailboxesApi_;
    CacheDB = _CacheDB_;
  }));

  context("method 'getAll'", function() {
    let $httpBackend;

    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it("should fetch letter from cache", function() {
      sinon.stub(CacheDB, "get").returns({
        hasBeen: function() { return false; } // mock cache
      });

      MailboxesApi.getAll();

      CacheDB.get.restore();
    });

    it("should change 'loading' flag", function() {
      sinon.stub(CacheDB, "get").returns(undefined); // not cached

      $httpBackend.expectGET(`${baseApi}/mailboxes`).respond(200, { data: "ok" });
      MailboxesApi.getAll();

      assert.isTrue(MailboxesApi.loading);
      $httpBackend.flush();

      assert.isFalse(MailboxesApi.loading);

      CacheDB.get.restore();
    });

    it("should put in the cache", function() {
      sinon.stub(CacheDB, "get").returns(undefined); // not cached
      sinon.stub(CacheDB, "add");

      $httpBackend.expectGET(`${baseApi}/mailboxes`).respond(200, { data: "ok" });
      MailboxesApi.getAll();

      $httpBackend.flush();
      assert.isTrue(CacheDB.add.called);

      CacheDB.get.restore();
      CacheDB.add.restore();
    });

  });

});
