import express from 'express'
import protect from '../middleware/authMiddleware.js'
import { commentController } from '../controllers/commentController.js'
const router = express.Router()

router
  // .get('/', protect)
  .get('/:postId', protect, commentController.getAllPostComments)
  .post('/', protect, commentController.addPostComment)

export {router}