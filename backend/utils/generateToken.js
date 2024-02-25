import jwt from "jsonwebtoken";

const generateToken = async (username, tokenType, expiresIn) => {
  const token = jwt.sign({ username }, tokenType, {
    expiresIn: expiresIn.toString(),
  });
  return token;
  //We want to save refresh token in database
};

export default generateToken;
