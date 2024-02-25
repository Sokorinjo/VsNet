import asyncHandler from 'express-async-handler'
import Post from '../models/postModel.js'

//@desc Get all posts
//@route GET /api/posts
//@access Private
const getAllPosts = asyncHandler(async (req, res) => {
  const allPosts = await Post.find({}).populate('user')


  res.send({message: 'All Posts', allPosts})
})

//@desc Add a new post
//@route POST /api/posts
//@access Private
const addNewPost = asyncHandler(async(req, res) => {
  const {title, text } = req.body
  const user = req.user._id

  const newPost = await Post.create({user, title, text})

  res.send(newPost)
})

//@desc Update post
//@route PATCH /api/posts
//@access Private
const updatePost = asyncHandler(async(req, res) => {
  res.send('Update Post')
})

//@desc Delete post
//@route DELETE /api/posts
//@access Private
const deletePost =asyncHandler(async (req, res) => {
  res.send('Delete Post')
})

export const postController = {
  getAllPosts,
  addNewPost,
  updatePost,
  deletePost
} 