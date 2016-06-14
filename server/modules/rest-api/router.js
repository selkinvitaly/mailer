"use strict";

const Router = require("koa-router");

let router = new Router();

let usersController = require("./controllers/users");
let lettersController = require("./controllers/letters");
let mailboxesController = require("./controllers/mailboxes");
let authController = require("./controllers/check-auth");

router.use(authController.auth);

router.param("userid", usersController.param);
router.get("/api/users", usersController.getAll);
router.get("/api/users/:userid", usersController.getById);
router.delete("/api/users/:userid", usersController.removeById);

router.param("letterid", lettersController.param);
router.get("/api/count_letters", lettersController.count);
router.get("/api/letters/:letterid", lettersController.getById);
router.post("/api/letters", lettersController.create);
router.delete("/api/letters/:letterid", lettersController.removeById);
router.delete("/api/letters", lettersController.removeMoreById);

router.param("boxid", mailboxesController.param);
router.get("/api/mailboxes", mailboxesController.getAll);
router.get("/api/mailboxes/:boxid/letters", mailboxesController.getLetters);
router.delete("/api/mailboxes/:boxid/letters", mailboxesController.cleanupMailbox);

module.exports = router;
