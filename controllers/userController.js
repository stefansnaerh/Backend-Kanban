
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


// Desc:  Register new user
// Route: POST /api/users
// Access: Public
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }
    // check if user exists
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)// pass the id to generateToken()
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// Desc: Authenticate user
// Route: POST /api/users/login
// Access: Public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})
    // compare the typed password with the crypted one
    if(user &&(await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)// pass the id to generateToken()
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// Desc:  Get user data
// Route: Get /api/users/me
// Access: Private
const getMe = asyncHandler(async (req, res) => {
    const {_id, name, email} = await User.findById(req.user.id)
    
    res.status(200).json({
        id: _id,
        name,
        email,
    })
})


// generate JWT token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}




module.exports = {
    registerUser,
    loginUser,
    getMe
}