import PostMessage from "../models/postMessage.js";
import mongoose from 'mongoose'

// Add try catch to my callback fuunctions
export const getPost = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const body = req.body;
  const newPost = new PostMessage(body);

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const body = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No post with that id");
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...body, _id}, { new: true });
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
    
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No post with that id");
  }
  await PostMessage.findOneAndDelete(_id);
  res.json({message: 'post deleted successfully'});
};

export const updateLikeCount = async (req, res) => {
    const { id: _id } = req.params;
    const body = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("No post with that id");
    }
    const post = await PostMessage.findById(_id);
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { likeCount: post.likeCount + 1}, { new: true})
    res.json(updatedPost);
};
