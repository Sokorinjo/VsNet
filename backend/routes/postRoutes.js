import express from 'express'
import protect from '../middleware/authMiddleware.js'
import { postController } from '../controllers/postController.js'
const router = express.Router()

router
  .get('/',protect, postController.getAllPosts)
  .get('/user-posts', protect, postController.getPostsForUser)
  .post('/',protect, postController.addNewPost)
  .patch('/',protect, postController.updatePost)
  .patch('/add-like', protect, postController.addLikeToPost)
  .delete('/',protect, postController.deletePost)

export {router}