const express = require("express");
const {
  createPost,
  getFeedPosts,
  getUserPosts,
  likePost,
} = require("../controller/postController");

const router = express.Router();

router.post("/", createPost);
// Get all feed posts
router.get("/feed", getFeedPosts);

// Get all posts by a user
router.get("/:userId/posts", getUserPosts);

// Like a post
router.patch("/:id/like", likePost);

module.exports = router;
