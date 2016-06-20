"use strict";

let baseApi = APP_CONF.baseApi;

describe("ErrorHandler service", function() {
  let $state, ErrorHandler, Notify;

  angular.mock.module.sharedInjector();

  before(angular.mock.module("app"));

  before(angular.mock.module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  before(angular.mock.inject(function(_$state_, _ErrorHandler_, _Notify_) {
    ErrorHandler = _ErrorHandler_;
    Notify = _Notify_;
    $state = _$state_;
  }));

  context("method 'handle'", function() {
    let fakeError;

    beforeEach(function() {
      sinon.stub(Notify, "add");
      fakeError = new Error();
    });

    afterEach(function() {
      Notify.add.restore();
      fakeError = null;
    });

    it("should show message for 400 status", function() {
      fakeError.status = 400;

      ErrorHandler.handle(fakeError);

      assert.isTrue(Notify.add.calledWith("Oops! Bad request!"));
    });

    it("should show message for 401 status", function() {
      fakeError.status = 401;

      ErrorHandler.handle(fakeError);

      assert.isTrue(Notify.add.calledWith("You need authenticate!"));
    });

    it("should redirect to login state for 401 status", function() {
      fakeError.status = 401;

      sinon.stub($state, "go");

      ErrorHandler.handle(fakeError);

      assert.isTrue($state.go.calledWith("login"));

      $state.go.restore();
    });

    it("should show message for 404 status", function() {
      fakeError.status = 404;

      ErrorHandler.handle(fakeError);

      assert.isTrue(Notify.add.calledWith("Sorry! Not found!"));
    });

    it("should show message for 500 status", function() {
      fakeError.status = 500;

      ErrorHandler.handle(fakeError);

      assert.isTrue(Notify.add.calledWith("Oops! Server error :( Try again later!"));
    });

    it("should do nothing for 2/3/5 'type' property", function() {
      fakeError.type = 2;
      ErrorHandler.handle(fakeError);
      assert.isFalse(Notify.add.called);

      fakeError.type = 3;
      ErrorHandler.handle(fakeError);
      assert.isFalse(Notify.add.called);

      fakeError.type = 5;
      ErrorHandler.handle(fakeError);
      assert.isFalse(Notify.add.called);
    });

    it("should call 'Notify.add' for another 'type' property", function() {
      fakeError.type = 99;

      ErrorHandler.handle(fakeError);

      assert.isTrue(Notify.add.called);
    });

    it("should show message for unknown error", function() {
      ErrorHandler.handle(fakeError);

      assert.isTrue(Notify.add.calledWith("Oops! Unknown error! Try again later!"));
    });

  });


});
