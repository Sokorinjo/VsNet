import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },
    lastname: {
      type: String,
      default: "",
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    refToken: {
      type: String,
    },
    likedPosts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

//DELETE ALL USERS
// const deleteUsers = async () => {
//   console.log('Deleting users...')
//   await User.deleteMany({});
//   console.log('Deleted all users.')
// };

// if (process.argv[2] == "-du") {
//   deleteUsers();
// } else {
//   console.log("Wrong argument.");
// }
export default User;
