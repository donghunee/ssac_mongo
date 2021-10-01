var express = require("express");
var router = express.Router();

const authRouter = require("./auth/index");

const boardRouter = require("./board/index");

const searchRouter = require("./search/index");

/* GET home page. */
router.use("/board", boardRouter);

router.use("/auth", authRouter);

router.use("/search", searchRouter);

module.exports = router;
