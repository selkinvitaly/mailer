"use strict";

let baseApi = APP_CONF.baseApi;

describe("UsersApi service", function() {
  let UsersApi, CacheDB

  angular.mock.module.sharedInjector();

  before(angular.mock.module("app"));

  before(angular.mock.module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  before(angular.mock.inject(function(_UsersApi_, _CacheDB_) {
    UsersApi = _UsersApi_;
    CacheDB = _CacheDB_;
  }));

  context("method 'getById'", function() {
    let $httpBackend;
    let testId = "123dfdf121esgsg";

    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it("should fetch user from cache", function() {
      sinon.stub(CacheDB, "get").returns({
        hasBeen: function() { return false; } // mock cache
      });

      UsersApi.getById(testId);

      CacheDB.get.restore();
    });

    it("should change 'loading' flag", function() {
      sinon.stub(CacheDB, "get").returns(undefined); // not cached

      $httpBackend.expectGET(`${baseApi}/users/${testId}`).respond(200, { data: "ok" });
      UsersApi.getById(testId);

      assert.isTrue(UsersApi.loading);
      $httpBackend.flush();

      assert.isFalse(UsersApi.loading);

      CacheDB.get.restore();
    });

    it("should put in the cache", function() {
      sinon.stub(CacheDB, "get").returns(undefined); // not cached
      sinon.stub(CacheDB, "add");

      $httpBackend.expectGET(`${baseApi}/users/${testId}`).respond(200, { data: "ok" });
      UsersApi.getById(testId);

      $httpBackend.flush();
      assert.isTrue(CacheDB.add.called);

      CacheDB.get.restore();
      CacheDB.add.restore();
    });

  });

  context("method 'getUsers'", function() {
    let $httpBackend;
    let offset = 5;
    let limit = 10;

    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET(`${baseApi}/users?offset=${offset}&limit=${limit}`).respond(200, { data: "ok" });
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it("should change 'loading' flag", function() {
      UsersApi.getUsers(offset, limit);

      assert.isTrue(UsersApi.loading);
      $httpBackend.flush();
      assert.isFalse(UsersApi.loading);
    });

  });

  context("method 'removeById'", function() {
    let $httpBackend;
    let testId = "123dfdf121esgsg";

    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectDELETE(`${baseApi}/users/${testId}`).respond(200, { data: "ok" });
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it("should change 'removing' flag", function() {
      UsersApi.removeById(testId);

      assert.isTrue(UsersApi.removing);
      $httpBackend.flush();

      assert.isFalse(UsersApi.removing);
    });

    it("should remove from the cache", function() {
      sinon.stub(CacheDB, "remove");

      UsersApi.removeById(testId);

      $httpBackend.flush();
      assert.isTrue(CacheDB.remove.called);

      CacheDB.remove.restore();
    });

  });

});
