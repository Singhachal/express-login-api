const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const likeController = require("../controllers/likeController");

// like post

router.post("/:id/like", verifyToken, likeController.likePost);

// Unlike Post

router.post("/:id/unlike", verifyToken, likeController.unlikePost);

// Get likes

router.get("/:id/likes", verifyToken, likeController.getLikes);

module.exports = router;