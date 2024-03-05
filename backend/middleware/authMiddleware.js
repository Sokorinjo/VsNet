import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler( async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization
  //Verify that authorization header exists
  
  if(!authHeader){
    res.status(403)
    throw new Error('Forbidden. No token.')
  }else{
    try{
      //Get token from headers
      const token = authHeader.split(' ')[1] //'Bearer fd456fht3wf/3.45.674,al523'
    
      //Get username from token
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
      //Find user and store in req
      req.user = await User.findOne({username: decoded.username}).select('-password').select('-refToken')
    
      next()
      
    }catch(error){
      console.error(error.name+ ":"+error.message)
      res.status(403)
      throw new Error('Forbidden. Bad token.')
    }

  }
})

export default protect