import express from "express"
import { authUser, getUserProfile, logoutUser, registerUser, updateUserProfile } from "../controllers/userControllers.js"
import { protect } from "../middleware/authMiddleware.js"

export const userRouter = express.Router()

userRouter.post('/', registerUser) // it'll handle the register user
userRouter.post('/auth', authUser) // it'll authenticate the user and also handle the login
userRouter.post('/logout', logoutUser)
userRouter
    .route('/profile')
    .get(protect, getUserProfile) //these two routes gets a protect middleware before
    .put(protect, updateUserProfile)
// this line chains works like below separately -- when the end point is same but the method is different
// userRouter.get('/profile', getUserProfile)
// userRouter.put('/profile', updateUserProfile)