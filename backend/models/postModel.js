import mongoose from "mongoose";
import User from './userModel.js'

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  likes:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
},
{
  timestamps: true
})

const Post = mongoose.model('Post', postSchema)
//DELETE ALL POSTS
// const deletePosts = async () => {
//   await connectDB()
//   console.log('Deleting posts...')
//   await Post.deleteMany({});
//   console.log('Deleted all posts.')
// };

// if (process.argv[2] == "-dp") {
//   deletePosts();
// } else {
//   console.log("Wrong argument.");
// }

export default Post