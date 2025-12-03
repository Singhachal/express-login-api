const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const commentController = require("../controllers/commentController");

router.post("/:postId", verifyToken, commentController.addComment);

//  get all comment 

router.get("/:postId", verifyToken, commentController.getComments);

module.exports = router;