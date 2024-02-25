import mongoose from "mongoose";
import User from "../models/userModel.js";
import jwt, { decode } from "jsonwebtoken";
import asyncHandler from "express-async-handler";

const handleRefreshToken = asyncHandler(async (req, res, next) => {
  const cookies = req.cookies;

  //Check if jwt cookie exists
  if (!cookies?.jwt) {
    res.status(401);
    throw new Error("Not authorized.");
  }

  const refreshToken = cookies.jwt;
  // res.clearCookie("jwt", {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV !== "development", 
  //   sameSite: "strict",
  // });

  //Find user with that same refresh token that is stored in cookie
  const user = await User.findOne({ refToken: refreshToken });

  //Check if user exists
  if (!user) {
    res.status(401);
    throw new Error("Not authorized.");
  }
  
  //Get user from cookie.jwt
  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

  if (user.username !== decoded.username) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const accessToken = jwt.sign(
    { username: decoded.username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "5m" }
  );

  res.json({accessToken})
  
});

export default handleRefreshToken;
