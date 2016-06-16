"use strict";

const should = require("should");
const rp = require("request-promise");
const config = require("config");
const path = require("path");

const app = require(path.join(config.get("rootServer"), "app.js"));

const host = config.get("server.host");
const port = config.get("server.port");
const root = config.get("root");

const fixtures = require(path.join(root, "fixtures"));
const loadModels = require(path.join(root, "fixtures/libs/loadModels.js"));

const testUser = fixtures.User[0];
const testLetter = fixtures.Letter[0];
const testMailbox = fixtures.Mailbox[0];

describe("API", function() {

  before(function*() {
    yield app.start();
    yield* loadModels("./fixtures");
  });

  after(function*() {
    yield app.stop();
  });

  describe("for unauthorized", function() {

    context("GET /api/users", function() {

      it("should respond 401", function*() {

        let response = yield rp({
          uri: `http://${host}:${port}/api/users`,
          simple: false,
          resolveWithFullResponse: true
        });

        should.strictEqual(401, response.statusCode);

      });

    });

    context("GET /api/users/:userid", function() {

      it("should respond 401", function*() {

        let response = yield rp({
          uri: `http://${host}:${port}/api/users/${testUser._id}`,
          simple: false,
          resolveWithFullResponse: true
        });

        should.strictEqual(401, response.statusCode);

      });

    });

    context("DELETE /api/users/:userid", function() {

      it("should respond 401", function*() {

        let response = yield rp({
          uri: `http://${host}:${port}/api/users/${testUser._id}`,
          simple: false,
          method: "DELETE",
          resolveWithFullResponse: true
        });

        should.strictEqual(401, response.statusCode);

      });

    });

    context("GET /api/count_letters", function() {

      it("should respond 401", function*() {

        let response = yield rp({
          uri: `http://${host}:${port}/api/count_letters`,
          simple: false,
          resolveWithFullResponse: true
        });

        should.strictEqual(401, response.statusCode);

      });

    });

    context("GET /api/letters/:letterid", function() {

      it("should respond 401", function*() {

        let response = yield rp({
          uri: `http://${host}:${port}/api/letters/${testLetter._id}`,
          simple: false,
          resolveWithFullResponse: true
        });

        should.strictEqual(401, response.statusCode);

      });

    });

    context("POST /api/letters", function() {

      it("should respond 401", function*() {

        let response = yield rp({
          uri: `http://${host}:${port}/api/letters`,
          simple: false,
          method: "POST",
          resolveWithFullResponse: true
        });

        should.strictEqual(401, response.statusCode);

      });

    });

    context("DELETE /api/letters/:letterid", function() {

      it("should respond 401", function*() {

        let response = yield rp({
          uri: `http://${host}:${port}/api/letters`,
          simple: false,
          method: "DELETE",
          resolveWithFullResponse: true
        });

        should.strictEqual(401, response.statusCode);

      });

    });

    context("DELETE /api/letters", function() {

      it("should respond 401", function*() {

        let response = yield rp({
          uri: `http://${host}:${port}/api/letters/${testLetter._id}`,
          simple: false,
          method: "DELETE",
          resolveWithFullResponse: true
        });

        should.strictEqual(401, response.statusCode);

      });

    });

    context("GET /api/mailboxes", function() {

      it("should respond 401", function*() {

        let response = yield rp({
          uri: `http://${host}:${port}/api/mailboxes`,
          simple: false,
          resolveWithFullResponse: true
        });

        should.strictEqual(401, response.statusCode);

      });

    });

    context("GET /api/mailboxes/:boxid/letters", function() {

      it("should respond 401", function*() {

        let response = yield rp({
          uri: `http://${host}:${port}/api/mailboxes/${testMailbox._id}/letters`,
          simple: false,
          resolveWithFullResponse: true
        });

        should.strictEqual(401, response.statusCode);

      });

    });

    context("DELETE /api/mailboxes/:boxid/letters", function() {

      it("should respond 401", function*() {

        let response = yield rp({
          uri: `http://${host}:${port}/api/mailboxes/${testMailbox._id}/letters`,
          simple: false,
          method: "DELETE",
          resolveWithFullResponse: true
        });

        should.strictEqual(401, response.statusCode);

      });

    });

    context("GET /notapi", function() {

      it("should respond 200", function*() {

        let response = yield rp({
          uri: `http://${host}:${port}/notapi`,
          simple: false,
          resolveWithFullResponse: true
        });

        should.strictEqual(200, response.statusCode);

      });

      it("should return html content-type", function*() {

        let response = yield rp({
          uri: `http://${host}:${port}/notapi`,
          simple: false,
          resolveWithFullResponse: true
        });

        response.headers["content-type"].should.containEql("text/html");

      });

    });

  });

  describe("for authorized", function() {
    let cookieJar = null;

    // login
    before(function*() {
      let j = rp.jar();

      let response = yield rp({
        uri: `http://${host}:${port}/api/login`,
        method: "POST",
        jar: j,
        form: {
          email: testUser.email,
          password: testUser.password
        },
        resolveWithFullResponse: true
      });

      cookieJar = j;

      should.strictEqual(200, response.statusCode);

    });

    // logout
    after(function*() {

      let response = yield rp({
        uri: `http://${host}:${port}/api/logout`,
        method: "POST",
        jar: cookieJar,
        resolveWithFullResponse: true
      });

      should.strictEqual(200, response.statusCode);

    });

    context("GET /api/users", function() {

      it("should respond 200", function*() {

        let response = yield rp({
          uri: `http://${host}:${port}/api/users`,
          simple: false,
          jar: cookieJar,
          resolveWithFullResponse: true
        });

        should.strictEqual(200, response.statusCode);

      });

      it("should return json type", function*() {
        let response = yield rp({
          uri: `http://${host}:${port}/api/users`,
          jar: cookieJar,
          resolveWithFullResponse: true
        });

        response.headers["content-type"].should.containEql("application/json");

      });

      it("should return data of users", function*() {
        const limit = 15;
        const offset = 20;

        let users = yield rp({
          uri: `http://${host}:${port}/api/users`,
          qs: { limit, offset },
          jar: cookieJar,
          json: true
        });

        let expectedTransformed = users.map(user => user._id);
        let actualTransformed = fixtures.User.slice(offset, offset + limit).map(user => user._id);

        should.strictEqual(expectedTransformed.length, actualTransformed.length);
        // expectedTransformed.should.be.eql(actualTransformed);

      });

    });

    context("GET /api/users/:userid", function() {

      it("should respond 200", function*() {

        let response = yield rp({
          uri: `http://${host}:${port}/api/users/${testUser._id}`,
          simple: false,
          jar: cookieJar,
          resolveWithFullResponse: true
        });

        should.strictEqual(200, response.statusCode);

      });

      it("should return json type", function*() {
        let response = yield rp({
          uri: `http://${host}:${port}/api/users/${testUser._id}`,
          jar: cookieJar,
          resolveWithFullResponse: true
        });

        response.headers["content-type"].should.containEql("application/json");

      });

      it("should return data of user", function*() {

        let user = yield rp({
          uri: `http://${host}:${port}/api/users/${testUser._id}`,
          jar: cookieJar,
          json: true
        });

        should.strictEqual(testUser._id, user._id);

      });

    });

    context("DELETE /api/users/:userid", function() {
      let fixtureId = fixtures.User[fixtures.User.length - 1]._id;

      it("should respond 200", function*() {

        let response = yield rp({
          uri: `http://${host}:${port}/api/users/${fixtureId}`,
          jar: cookieJar,
          method: "DELETE",
          resolveWithFullResponse: true
        });

        should.strictEqual(200, response.statusCode);

      });

      it("should respond 404 after deleting", function*() {

        let response = yield rp({
          uri: `http://${host}:${port}/api/users/${fixtureId}`,
          jar: cookieJar,
          simple: false,
          resolveWithFullResponse: true
        });

        should.strictEqual(404, response.statusCode);

      });

    });

    context("GET /api/count_letters", function() {
      let calculatedCount = {};

      fixtures.Letter.forEach(letter => {
        calculatedCount[letter.mailbox] = (calculatedCount[letter.mailbox] + 1) || 1;
      });

      it("should respond 200", function*() {

        let response = yield rp({
          uri: `http://${host}:${port}/api/count_letters`,
          jar: cookieJar,
          resolveWithFullResponse: true
        });

        should.strictEqual(200, response.statusCode);

      });

      it("should return the number of letters in mailbox", function*() {

        let fetchedCount = yield rp({
          uri: `http://${host}:${port}/api/count_letters`,
          jar: cookieJar,
          json: true
        });

        calculatedCount.should.be.eql(fetchedCount);

      });

    });

    context("GET /api/letters/:letterid", function() {

      it("should respond 200", function*() {

        let response = yield rp({
          uri: `http://${host}:${port}/api/letters/${testLetter._id}`,
          jar: cookieJar,
          resolveWithFullResponse: true
        });

        should.strictEqual(200, response.statusCode);

      });

      it("should return data of letter", function*() {

        let letter = yield rp({
          uri: `http://${host}:${port}/api/letters/${testLetter._id}`,
          jar: cookieJar,
          json: true
        });

        should.strictEqual(testLetter._id, letter._id);

      });

    });

    context("POST /api/letters", function() {
      let expectedLetter = {
        subject: "subject-test",
        mailbox: testMailbox._id,
        body: "body-test",
        to: "test@test.com"
      };

      let actualLetter = null;

      it("should respond 400 for empty subject", function*() {
        let notValidLetter = Object.assign({}, expectedLetter);

        delete notValidLetter.subject;

        let response = yield rp({
          uri: `http://${host}:${port}/api/letters`,
          jar: cookieJar,
          method: "POST",
          simple: false,
          form: notValidLetter,
          resolveWithFullResponse: true
        });

        should.strictEqual(400, response.statusCode);

      });

      it("should respond 400 for empty body", function*() {
        let notValidLetter = Object.assign({}, expectedLetter);

        delete notValidLetter.body;

        let response = yield rp({
          uri: `http://${host}:${port}/api/letters`,
          jar: cookieJar,
          method: "POST",
          simple: false,
          form: notValidLetter,
          resolveWithFullResponse: true
        });

        should.strictEqual(400, response.statusCode);

      });

      it("should respond 400 for empty email", function*() {
        let notValidLetter = Object.assign({}, expectedLetter);

        delete notValidLetter.to;

        let response = yield rp({
          uri: `http://${host}:${port}/api/letters`,
          jar: cookieJar,
          method: "POST",
          simple: false,
          form: notValidLetter,
          resolveWithFullResponse: true
        });

        should.strictEqual(400, response.statusCode);

      });

      it("should respond 400 for incorrect email", function*() {
        let notValidLetter = Object.assign({}, expectedLetter);

        notValidLetter.to = "email-email.com";

        let response = yield rp({
          uri: `http://${host}:${port}/api/letters`,
          jar: cookieJar,
          method: "POST",
          simple: false,
          form: notValidLetter,
          resolveWithFullResponse: true
        });

        should.strictEqual(400, response.statusCode);

      });

      it("should respond 200", function*() {

        let response = yield rp({
          uri: `http://${host}:${port}/api/letters`,
          jar: cookieJar,
          json: true,
          method: "POST",
          form: expectedLetter,
          resolveWithFullResponse: true
        });

        actualLetter = response.body;

        should.strictEqual(200, response.statusCode);

      });

      it("should return created letter", function*() {
        should.strictEqual(expectedLetter.subject, actualLetter.subject);
        should.strictEqual(expectedLetter.to, actualLetter.to);
        should.strictEqual(expectedLetter.body, actualLetter.body);
      });

      it("should return created letter after creating", function*() {

        let letter = yield rp({
          uri: `http://${host}:${port}/api/letters/${actualLetter._id}`,
          jar: cookieJar,
          json: true
        });

        letter.should.be.eql(actualLetter);

      });

    });

    context("DELETE /api/letters/:letterid", function() {

      it("should respond 200", function*() {

        let response = yield rp({
          uri: `http://${host}:${port}/api/letters/${testLetter._id}`,
          jar: cookieJar,
          method: "DELETE",
          resolveWithFullResponse: true
        });

        should.strictEqual(200, response.statusCode);

      });

      it("should respond 404 after deleting", function*() {

        let response = yield rp({
          uri: `http://${host}:${port}/api/letters/${testLetter._id}`,
          jar: cookieJar,
          simple: false,
          resolveWithFullResponse: true
        });

        should.strictEqual(404, response.statusCode);

      });

    });

    context("DELETE /api/letters", function() {

      // getting the 2 last items
      let deletedId = fixtures.Letter.slice(fixtures.Letter.length - 2).map(letter => letter._id);
      let fetchedId = null;

      it("should respond 200", function*() {

        let response = yield rp({
          uri: `http://${host}:${port}/api/letters`,
          jar: cookieJar,
          method: "DELETE",
          body: { deleteId: deletedId },
          json: true,
          resolveWithFullResponse: true
        });

        fetchedId = response.body;

        should.strictEqual(200, response.statusCode);

      });

      it("should return deleted ids", function*() {
        deletedId.should.be.eql(fetchedId);
      });

      it("should respond 404 for the first deleted id", function*() {

        let response = yield rp({
          uri: `http://${host}:${port}/api/letters/${deletedId[0]}`,
          jar: cookieJar,
          simple: false,
          resolveWithFullResponse: true
        });

        should.strictEqual(404, response.statusCode);

      });

      it("should respond 404 for the second deleted id", function*() {

        let response = yield rp({
          uri: `http://${host}:${port}/api/letters/${deletedId[1]}`,
          jar: cookieJar,
          simple: false,
          resolveWithFullResponse: true
        });

        should.strictEqual(404, response.statusCode);

      });

    });

    context("GET /api/mailboxes", function() {

      it("should respond 200", function*() {

        let response = yield rp({
          uri: `http://${host}:${port}/api/mailboxes`,
          jar: cookieJar,
          resolveWithFullResponse: true
        });

        should.strictEqual(200, response.statusCode);

      });

      it("should return data of mailboxes", function*() {

        let mailboxes = yield rp({
          uri: `http://${host}:${port}/api/mailboxes`,
          jar: cookieJar,
          json: true
        });

        let expected = mailboxes.map(box => box._id);
        let actual = fixtures.Mailbox.map(box => box._id);

        expected.should.be.eql(actual);

      });

    });

    context("GET /api/mailboxes/:boxid/letters", function() {

      it("should respond 200", function*() {

        let response = yield rp({
          uri: `http://${host}:${port}/api/mailboxes/${testMailbox._id}/letters`,
          jar: cookieJar,
          resolveWithFullResponse: true
        });

        should.strictEqual(200, response.statusCode);

      });

      it("should return only letters for passed mailboxid", function*() {

        let letters = yield rp({
          uri: `http://${host}:${port}/api/mailboxes/${testMailbox._id}/letters`,
          jar: cookieJar,
          json: true
        });

        let anotherLetters = letters
          .map(letter => letter.mailbox)
          .filter(id => id !== testMailbox._id);

        should.strictEqual(0, anotherLetters.length);

      });

    });

    context("DELETE /api/mailboxes/:boxid/letters", function() {

      it("should respond 200", function*() {

        let response = yield rp({
          uri: `http://${host}:${port}/api/mailboxes/${testMailbox._id}/letters`,
          method: "DELETE",
          jar: cookieJar,
          resolveWithFullResponse: true
        });

        should.strictEqual(200, response.statusCode);

      });

      it("should doesn't contain removed letters", function*() {

        let letters = yield rp({
          uri: `http://${host}:${port}/api/mailboxes/${testMailbox._id}/letters`,
          jar: cookieJar,
          json: true
        });

        should.strictEqual(0, letters.length);

      });

    });

  });

});
