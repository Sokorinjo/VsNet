import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

//@desc Register new user
//@route POST /api/users/register
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const {name, lastname, username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please input all fields");
  }

  //Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //Hash password
  const genSalt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, genSalt);

  //Create user
  const user = await User.create({
    name,
    lastname,
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      refToken: user.refToken,
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

//@desc Login user
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill all fields.");
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    //Generate access token
    const accessToken = jwt.sign(
      { username: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "5m",
      }
    );

    //Generate refresh token
    const refreshToken = jwt.sign(
      { username: user.username },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    
    //Add refresh token to database
    user.refToken = refreshToken;
    user.save();
    const userId = user._id

    //Add refresh token to cookie
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({currentId: user._id, accessToken, username: user.username });
  } else {
    res.status(401);
    throw new Error("Wrong email or password");
  }
});

//@desc Logout user
//@route POST /api/users/logout
//@access Private
const logoutUser = asyncHandler(async (req, res) => {

  //On client, also delete the accessToken
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    res.status(204);
  }

  const refreshToken = req.cookies.jwt;

  //Is refresh token in DB
  const user = await User.findOne({ refToken: refreshToken });

  if (!user) {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development", 
      sameSite: "strict",
    });
    res.status(204)
  }

  //Delete the refresh token in DB
  user.refToken = ''
  user.save()

  //Clear cookie
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
  });

  //PROVERI OPET MOZDA NE TREBA
  res.cookie('jwt', "", {
    httpOnly: true,
    expires: new Date(0)
  })
   

  res.json({ message: `User ${user.username} logged out successfuly` });
});

//@desc Get user info
//@route GET /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = req.user;
  res.status(200).send(user);
});

//@desc Update user info
//@route PATCH /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const {name, lastname, username, email} = req.body
  const {_id: userId} = req.user._id
  console.log(userId)
  // console.log(req.body)
  const updatedUser = await User.findOneAndUpdate({_id: req.user._id}, {name, lastname, username, email}, {new: true})
  console.log(updatedUser)
  
  res.send({user:"user"})
  // res.json(req.user._id);
});

const getAllUsers = asyncHandler(async(req, res) => {

  const users = await User.find({})

  res.send(users)
})

export {
  registerUser,
  loginUser,
  logoutUser,
  updateUserProfile,
  getUserProfile,
  getAllUsers
};
