import asyncHandler from 'express-async-handler'
import Post from '../models/postModel.js'

//@desc Get all posts
//@route GET /api/posts
//@access Private
const getAllPosts = asyncHandler(async (req, res) => {
  const allPosts = await Post.find({}).populate('user')


  res.send(allPosts)
})

//@desc Get all user posts
//@routed GET /api/posts/users-posts
//@access Private
const getPostsForUser = asyncHandler(async(req, res) => {
  const user = req.user._id
  const usersPosts = await Post.find({user})
  
  res.send(usersPosts)
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
  const user = req.user._id
  const title = req.body.title
  const text = req.body.text
  const postId = req.body.postId

  const updatedPost = await Post.findOneAndUpdate({_id: postId, user}, {title, text}, {new: true})
  res.send({message: "Updated Post"})
})

//@desc Delete post
//@route DELETE /api/posts
//@access Private
const deletePost = asyncHandler(async (req, res) => {0
  const user = req.user._id
  const {id} = req.body

  await Post.findByIdAndDelete({_id: id})
  res.send({message: `Post: ${id} deleted.`})
})

//@desc Add like to a post
//@route PATCH /api/posts/add-like
//@access Private
const addLikeToPost = asyncHandler(async(req, res) => {
  const user = req.user._id
  const {postId} = req.body


  const updatedPost = await Post.findById({_id: postId})
  if(!updatedPost.likes.includes(user)){
    updatedPost.likes.push(user)
    console.log("LIKED :)")
    await updatedPost.save()
    console.log(updatedPost)
    res.send({message:"Liked"})
  }else{
    const selectUser = await updatedPost.likes.pull(user)
    console.log("UNLIKED :(")
    await updatedPost.save()
    console.log(updatedPost)
    res.send({message: "Disliked"})
  }
})

export const postController = {
  getAllPosts,
  getPostsForUser,
  addNewPost,
  updatePost,
  deletePost,
  addLikeToPost
} 