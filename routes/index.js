var express = require("express");
var router = express.Router();

const ssacRouter = require("./ssac/index");

/* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Express" });
// });

router.use("/ssac", ssacRouter);

module.exports = router;
