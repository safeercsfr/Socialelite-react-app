import Post from "../models/Post.js";
import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { description } = req.body;
    const { id } = req.user
    const result = await cloudinary.uploader.upload(req.file.path, {folder:"Posts"} );
    const user = await User.findById(id);
    const newPost = new Post({
      userId:id,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath: result.secure_url,
      likes: {},
      comments: [],
    });

    await newPost.save();

    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId }).find().sort({ createdAt: -1 });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// ADD COMMENT

export const postComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment, userId } = req.body;
    const post = await Post.findById(id);
    post.comments.push({ comment: comment, userId: userId, isDelete: false });
    await post.save();

    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
