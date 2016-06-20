"use strict";

let baseApi = APP_CONF.baseApi;

describe("Auth service", function() {
  let Auth;

  angular.mock.module.sharedInjector();

  before(angular.mock.module("app"));

  before(angular.mock.module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  before(angular.mock.inject(function(_Auth_) {
    Auth = _Auth_;
  }));

  context("method 'logout'", function() {
    let $httpBackend;

    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $httpBackend.whenPOST(`${baseApi}/logout`).respond(200, { data: "ok" });
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it("should return promise", function() {
      assert.isOk(Auth.logout().then);
      $httpBackend.flush();
    });

    it("should change 'loading' flag", function() {
      Auth.logout();
      assert.isTrue(Auth.loading);
      $httpBackend.flush();
      assert.isFalse(Auth.loading);
    });

    it("should send request to logout", function() {
      $httpBackend.expectPOST(`${baseApi}/logout`);
      Auth.logout();
      $httpBackend.flush();
    });

  });

  context("method 'login'", function() {
    let $httpBackend;

    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $httpBackend.whenPOST(`${baseApi}/login`).respond(200, { data: "ok" });
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it("should return promise", function() {
      assert.isOk(Auth.login("mike@test.ru", "mike").then);
      $httpBackend.flush();
    });

    it("should change 'loading' flag", function() {
      Auth.login("mike@test.ru", "mike");
      assert.isTrue(Auth.loading);
      $httpBackend.flush();
      assert.isFalse(Auth.loading);
    });

    it("should send request to login", function() {
      $httpBackend.expectPOST(`${baseApi}/login`, "email=mike@test.ru&password=mike", function(headers) {
        return headers["Content-Type"] === "application/x-www-form-urlencoded";
      });

      Auth.login("mike@test.ru", "mike");
      $httpBackend.flush();
    });

  });


});
