import express from 'express'
import protect from '../middleware/authMiddleware.js'
import { postController } from '../controllers/postController.js'
const router = express.Router()

router
  .get('/',protect, postController.getAllPosts)
  .post('/',protect, postController.addNewPost)
  .patch('/',protect, postController.updatePost)
  .delete('/',protect, postController.deletePost)

export {router}