var express = require("express");
const boardController = require("../../../controllers/ssac/boardController");
const authModule = require("../../../modules/authModule");
var router = express.Router();

/* GET home page. */
// 인증 필
router.post("/", authModule.loggedIn, boardController.createBoard);
router.put("/:id", authModule.loggedIn, boardController.updateBoard);
router.delete("/:id", authModule.loggedIn, boardController.deleteBoard);

router.get("/", boardController.readAllBoard);
router.get("/:id", boardController.readDetailBoard);

module.exports = router;
