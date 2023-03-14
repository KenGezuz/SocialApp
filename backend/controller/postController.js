const Post = require("../models/postModel");
const User = require("../models/userModel");

/* CREATE */
const createPost = async (req, res) => {
  try {
    // Extract data from request body
    const { userId, description, picturePath } = req.body;
    
    // Find the user who created the post
    const user = await User.findById(userId);

    // Create a new post with the user's information and the provided data
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {}, // initialize likes and comments to empty objects and arrays
      comments: [],
    });

    // Save the new post to the database
    await newPost.save();

    // Retrieve all posts from the database and return them in the response
    const posts = await Post.find({});
    res.status(201).json(posts);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
const getFeedPosts = async (req, res) => {
  try {
    // Retrieve all posts from the database and return them in the response
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


const getUserPosts = async (req, res) => {
  try {
    // Extract the user ID from the request parameters
    const { userId } = req.params;

    // Find all posts in the database that belong to the specified user
    const posts = await Post.find({ userId });

    // Return the user's posts in the response
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
const likePost = async (req, res) => {
  try {
    // Extract the post ID and user ID from the request parameters and body
    const { id } = req.params;
    const { userId } = req.body;

    // Find the post in the database
    const post = await Post.findById(id);

    // Check if the user has already liked the post
    const isLiked = post.likes.get(userId);

    // Toggle the user's like on the post
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    // Update the post's likes in the database
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true } // Return the updated document in the response
    );

    // Return the updated post in the response
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports = {createPost, getFeedPosts, getUserPosts,likePost}