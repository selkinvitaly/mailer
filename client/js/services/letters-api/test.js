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

    it("should fetch letter from server", function() {
      sinon.stub(CacheDB, "get").returns(undefined); // not cached

      LettersApi.getById(testId);

      $httpBackend.expectGET(`${baseApi}/letters/${testId}`);

      $httpBackend.flush();

      CacheDB.get.restore();
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

      LettersApi.getById(testId);

      $httpBackend.expectGET(`${baseApi}/letters/${testId}`);

      assert.isTrue(LettersApi.loading);
      $httpBackend.flush();

      assert.isFalse(LettersApi.loading);

      CacheDB.get.restore();
    });

  });

  context("method 'count'", function() {
    let $httpBackend;

    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET(`${baseApi}/count_letters`).respond(200, { data: "ok" });
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it("should change 'loading' flag", function() {
      LettersApi.count();

      assert.isTrue(LettersApi.loading);
      $httpBackend.flush();
      assert.isFalse(LettersApi.loading);
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

  });

  context("method 'getByMailbox'", function() {
    let $httpBackend;
    let testBoxId = "1213fsdgdg2rsg3tsg";
    let offset = 5;
    let limit = 10;

    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET(`${baseApi}/mailboxes/${testBoxId}/letters?offset=${offset}&limit=${limit}`).respond(200, { data: "ok" });
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it("should change 'loading' flag", function() {
      LettersApi.getByMailbox(testBoxId, offset, limit);

      assert.isTrue(LettersApi.loading);
      $httpBackend.flush();

      assert.isFalse(LettersApi.loading);
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

  });


});
