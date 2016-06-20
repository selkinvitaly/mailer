"use strict";

const Router = require("koa-router");

let router = new Router();

router.post("/api/login", require("./controllers/login").post);
router.post("/api/logout", require("./controllers/logout").post);

module.exports = router;
