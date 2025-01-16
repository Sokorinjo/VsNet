import asyncHandler from "express-async-handler";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import Comment from "../models/commentModel.js";

//@desc Get all post comments
//@route GET /api/comments/:postId
//@access Private
const getAllPostComments = asyncHandler(async (req, res) => {
  //get post id
  const { postId } = req.params;

  //find all comments for that post
  const allPostComments = await Comment.find({ postId: postId }).populate('userId');

  res.send( allPostComments );
});

//@desc Add comment
//@route POST /api/comments
//@access Private
const addPostComment = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { postId, commentText: text } = req.body;
  const postComment = await Comment.create({ userId, postId, text });

  res.send({ message: `Comment added to post: ${postId}`, postComment });
});


//@desc Delete comment
//@route DELETE /api/comments/:commentId
//@access Private
const deletePostComment = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { postId, commentText: text } = req.body;
  const postComment = await Comment.create({ userId, postId, text });

  res.send({ message: `Comment added to post: ${postId}`, postComment });
});

//@desc Edit comment
//@route PATCH /api/comments/:id
//@access Private
const editPostComment = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { postId, commentText: text } = req.body;
  const postComment = await Comment.create({ userId, postId, text });

  res.send({ message: `Comment added to post: ${postId}`, postComment });
});

const deletePostComments = asyncHandler(async (req, res) => {
  const postId = req.body.postId
  console.log(req.body)
  const deletedPostComments = await Comment.deleteMany({ postId });
  console.log(deletedPostComments);
  res.send({ message: `Comments deleted for post: ${postId}`});

})


export const commentController = {
  getAllPostComments,
  addPostComment,
  deletePostComments
};
