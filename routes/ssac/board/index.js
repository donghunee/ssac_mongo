var express = require("express");
const boardController = require("../../../controllers/ssac/boardController");
var router = express.Router();

/* GET home page. */

router.post("/", boardController.createBoard);
router.get("/", boardController.readAllBoard);
router.get("/:id", boardController.readDetailBoard);
router.put("/:id", boardController.updateBoard);
router.delete("/:id", boardController.deleteBoard);

module.exports = router;
