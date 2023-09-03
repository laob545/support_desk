const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req,res,next)=>{
    let token
   
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){   
        try{
            //Get token from header
            token = req.headers.authorization.split(' ')[1]
            //Verify token
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            console.log(decoded.id)
            //gET USER fron token
            req.user= await User.findById(decoded.id).select('-password')
            next()
        }
        catch(error){
            console.log(error)
            res.status(401)
            throw new Error('Not authorized111')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Not authorized222')
    }  
})
module.exports = {protect}