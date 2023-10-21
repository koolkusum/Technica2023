import Post from "../models/Post.js";
import User from "../models/User.js";

//when making a post it takes all these parameters
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},//no likes when first created
      comments: [],//no comments when first created
    });
    //wait for it to be saved
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
//return all posts
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//get a user post from a specific id
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {//error catching
    res.status(404).json({ message: err.message });
  }
};

//if post is liked then update to unlike it
//if it is not yet liked, then like it
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    //grabbing if the ppost was liked by the uder
    const isLiked = post.likes.get(userId);

    if (isLiked) {//already liked
      post.likes.delete(userId);
    } else {//liked by specifc user id
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,//shows all the people who liked a certain post
      { likes: post.likes },
      { new: true }
    );
      //returned to frontend
    res.status(200).json(updatedPost);
  } catch (err) {//error catching
    res.status(404).json({ message: err.message });
  }
};