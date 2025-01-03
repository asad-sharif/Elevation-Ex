import asyncHandler from "express-async-handler"
import { User } from '../models/userModel.js'
import generateToken from "../utils/generateToken.js"


// @desc Auth user/set token
// route POST /api/users/auth
// @access Public
export const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id)
        res.status(200).json({
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role
        })
    } else {
        return res.status(401).json({ message: "Invalid email or password" }); // Send JSON error message
    }
})

// @desc Register a new user
// route POST /api/users/
// @access Public
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const user = await User.create({ name, email, password });
    if (user) {
        // Generate token and send response
        generateToken(res, user._id);
        return res.status(201).json({
            message: 'User registered successfully',
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
        });
    } else {
        console.log('Invalid user data');
        return res.status(400).json({ message: 'Invalid user data' });
    }
});


// @desc Logout user
// route POST /api/users/logout
// @access Public
export const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({ message: 'User logged out.' })
})

// @desc Get user profile
// route GET /api/users/profile
// @access Private --> for you need to have a valid json token to get the profile
export const getUserProfile = asyncHandler(async (req, res) => {
    const user = req.user

    res.status(200).json(user)
})

// @desc Update user profile
// route PUT /api/users/profile
// @access Private --> for you need to have a valid json token to get the profile
export const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        if (req.body.password) {
            user.password = req.body.password
        }
        const updatedUser = await user.save()
        res.status(200).json({ message: 'User updated succesfully', updatedUser })
    } else {
        res.status(404).json({ message: 'User not found' })
    }

})

// @desc count allusers
// route PUT /api/users/count
// @access Public
export const countUsers = asyncHandler(async (req, res) => {
    try {
        const totalUsers = await User.countAll()
        return res.status(200).json({ totalUsers: totalUsers })
    } catch (error) {
        return res.status(400).json({ message: 'User count error.', Error: error })
    }

})