const Post = require("../models/Post");
const User = require("../models/User");

// LIKE POST
exports.likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id; // FIXED

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // prevent duplicate like
    if (post.likes.includes(userId)) {
      return res.status(400).json({ message: "Already liked this post" });
    }

    post.likes.push(userId);
    await post.save();

    res.status(200).json({
      message: "Post liked successfully",
      likesCount: post.likes.length,
    });
  } catch (error) {
    console.error("likePost Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// UNLIKE POST
exports.unlikePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id; // FIXED

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (!post.likes.includes(userId)) {
      return res.status(400).json({ message: "You haven't liked this post" });
    }

    post.likes = post.likes.filter((id) => id.toString() !== userId);
    await post.save();

    res.status(200).json({
      message: "Post unliked successfully",
      likesCount: post.likes.length,
    });
  } catch (error) {
    console.error("unlikePost Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// GET LIKE LIST
exports.getLikes = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.findById(postId).populate("likes", "name email");

    if (!post) return res.status(404).json({ message: "Post not found" });

    res.status(200).json({
      totalLikes: post.likes.length,
      users: post.likes,
    });
  } catch (error) {
    console.error("getLikes Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
