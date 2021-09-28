var express = require("express");
var router = express.Router();

const authRouter = require("./auth/index");

const boardRouter = require("./board/index");

/* GET home page. */
router.use("/board", boardRouter);

router.use("/auth", authRouter);

module.exports = router;
