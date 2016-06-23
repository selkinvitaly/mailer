"use strict";

let baseApi = APP_CONF.baseApi;

describe("LettersApi service", function() {
  let LettersApi, CacheDB, $httpParamSerializerJQLike;

  angular.mock.module.sharedInjector();

  before(angular.mock.module("app"));

  before(angular.mock.module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  before(angular.mock.inject(function(_$httpParamSerializerJQLike_, _LettersApi_, _CacheDB_) {
    LettersApi = _LettersApi_;
    CacheDB = _CacheDB_;
    $httpParamSerializerJQLike = _$httpParamSerializerJQLike_;
  }));

  context("method 'getById'", function() {
    let $httpBackend;
    let testId = "123dfdf121esgsg";

    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $httpBackend.whenGET(`${baseApi}/letters/${testId}`).respond(200, { data: "ok" });
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it("should fetch letter from cache", function() {
      sinon.stub(CacheDB, "get").returns({
        hasBeen: function() { return false; } // mock cache
      });

      LettersApi.getById(testId);

      CacheDB.get.restore();
    });

    it("should change 'loading' flag", function() {
      sinon.stub(CacheDB, "get").returns(undefined); // not cached

      $httpBackend.expectGET(`${baseApi}/letters/${testId}`).respond(200, { data: "ok" });

      LettersApi.getById(testId);

      assert.isTrue(LettersApi.loading);
      $httpBackend.flush();

      assert.isFalse(LettersApi.loading);

      CacheDB.get.restore();
    });

    it("should put in the cache", function() {
      sinon.stub(CacheDB, "get").returns(undefined); // not cached
      sinon.stub(CacheDB, "add");

      $httpBackend.expectGET(`${baseApi}/letters/${testId}`).respond(200, { data: "ok" });

      LettersApi.getById(testId);

      $httpBackend.flush();

      assert.isTrue(CacheDB.add.called);

      CacheDB.get.restore();
      CacheDB.add.restore();
    });

  });

  context("method 'count'", function() {
    let $httpBackend;

    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it("should fetch count from cache", function() {
      sinon.stub(CacheDB, "get").returns({
        hasBeen: function() { return false; } // mock cache
      });

      LettersApi.count();

      CacheDB.get.restore();
    });

    it("should change 'loading' flag", function() {
      sinon.stub(CacheDB, "get").returns(undefined); // not cached

      $httpBackend.expectGET(`${baseApi}/count_letters`).respond(200, { data: "ok" });
      LettersApi.count();

      assert.isTrue(LettersApi.loading);
      $httpBackend.flush();
      assert.isFalse(LettersApi.loading);

      CacheDB.get.restore();
    });

    it("should put in the cache", function() {
      sinon.stub(CacheDB, "get").returns(undefined); // not cached
      sinon.stub(CacheDB, "add");

      $httpBackend.expectGET(`${baseApi}/count_letters`).respond(200, { data: "ok" });
      LettersApi.count();

      $httpBackend.flush();
      assert.isTrue(CacheDB.add.called);

      CacheDB.get.restore();
      CacheDB.add.restore();
    });

  });

  context("method 'create'", function() {
    let $httpBackend;
    let testLetter = { subject: "test" };

    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectPOST(`${baseApi}/letters`, $httpParamSerializerJQLike(testLetter), function(headers) {
        return headers["Content-Type"] === "application/x-www-form-urlencoded";
      }).respond(200, { data: "ok" });
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it("should change 'loading' flag", function() {
      LettersApi.create(testLetter);

      assert.isTrue(LettersApi.loading);
      $httpBackend.flush();

      assert.isFalse(LettersApi.loading);
    });

    it("should remove from the cache", function() {
      sinon.stub(CacheDB, "remove");

      LettersApi.create(testLetter);

      $httpBackend.flush();
      assert.isTrue(CacheDB.remove.called);

      CacheDB.remove.restore();
    });

  });

  context("method 'getByMailbox'", function() {
    let $httpBackend;
    let testBoxId = "1213fsdgdg2rsg3tsg";
    let offset = 5;
    let limit = 10;

    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it("should change 'loading' flag", function() {
      sinon.stub(CacheDB, "get").returns(undefined); // not cached

      $httpBackend.expectGET(`${baseApi}/mailboxes/${testBoxId}/letters?offset=${offset}&limit=${limit}`).respond(200, { data: "ok" });
      LettersApi.getByMailbox(testBoxId, offset, limit);

      assert.isTrue(LettersApi.loading);
      $httpBackend.flush();

      assert.isFalse(LettersApi.loading);

      CacheDB.get.restore();
    });

    it("should put in the cache", function() {
      sinon.stub(CacheDB, "get").returns(undefined); // not cached
      sinon.stub(CacheDB, "add");

      $httpBackend.expectGET(`${baseApi}/mailboxes/${testBoxId}/letters?offset=${offset}&limit=${limit}`).respond(200, { data: "ok" });
      LettersApi.getByMailbox(testBoxId, offset, limit);

      $httpBackend.flush();
      assert.isTrue(CacheDB.add.called);

      CacheDB.get.restore();
      CacheDB.add.restore();
    });

    it("should fetch letters from cache", function() {
      sinon.stub(CacheDB, "get").returns({
        hasBeen: function() { return false; } // mock cache
      });

      LettersApi.getByMailbox(testBoxId, offset, limit);

      CacheDB.get.restore();
    });

  });

  context("method 'removeById'", function() {
    let $httpBackend;
    let testId = "123dfdf121esgsg";

    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectDELETE(`${baseApi}/letters/${testId}`).respond(200, { data: "ok" });
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it("should change 'removing' flag", function() {
      LettersApi.removeById(testId);

      assert.isTrue(LettersApi.removing);
      $httpBackend.flush();

      assert.isFalse(LettersApi.removing);
    });

    it("should remove from the cache", function() {
      sinon.stub(CacheDB, "remove");

      LettersApi.removeById(testId);

      $httpBackend.flush();
      assert.isTrue(CacheDB.remove.called);

      CacheDB.remove.restore();
    });

  });

  context("method 'removeMoreById'", function() {
    let $httpBackend;
    let testId = ["123dfdf121esgsg", "45754712sdfdsf"];

    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expect("DELETE", `${baseApi}/letters`, { deleteId: testId }, function(headers) {
        return headers["Content-Type"] === "application/json";
      }).respond(200, { data: "ok" });
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it("should change 'removing' flag", function() {
      LettersApi.removeMoreById(testId);

      assert.isTrue(LettersApi.removing);
      $httpBackend.flush();

      assert.isFalse(LettersApi.removing);
    });

    it("should change 'removing' flag", function() {
      sinon.stub(CacheDB, "remove");

      LettersApi.removeMoreById(testId);

      $httpBackend.flush();

      assert.isTrue(CacheDB.remove.called);

      CacheDB.remove.restore();
    });

  });

  context("method 'cleanMailbox'", function() {
    let $httpBackend;
    let testId = "123dfdf121esgsg";

    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expect("DELETE", `${baseApi}/mailboxes/${testId}/letters`).respond(200, { data: "ok" });
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it("should change 'removing' flag", function() {
      LettersApi.cleanMailbox(testId);

      assert.isTrue(LettersApi.removing);
      $httpBackend.flush();

      assert.isFalse(LettersApi.removing);
    });

    it("should remove from the cache", function() {
      sinon.stub(CacheDB, "remove");

      LettersApi.cleanMailbox(testId);

      $httpBackend.flush();

      assert.isTrue(CacheDB.remove.called);

      CacheDB.remove.restore();
    });

  });


});
