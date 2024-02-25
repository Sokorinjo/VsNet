import mongoose from "mongoose";
import User from "./userModel.js";
import Post from "./postModel.js";

const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  postId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  text: {
    type: 'String',
    required: true
  }
})

const Comment = mongoose.model('Comment', commentSchema)

export default Comment