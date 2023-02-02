
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token
    // token comes in header with a "Bearer in front"
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // Get token from header
            // Turning the header to a array and skipping Bearer [23dlaskd2k12lkdsl122]
            token = req.headers.authorization.split(' ')[1]

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
            //Get user from the token
            req.user = await User.findById(decoded.id).select('-password')// skip the password

            next()
            
        } catch (error){
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }
    if(!token){
    res.status(401)
    throw new Error('Not auhtorized, no token')
    }
})


module.exports = { protect }