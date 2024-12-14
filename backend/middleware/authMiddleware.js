import jwt from 'jsonwebtoken'
import { User } from '../models/userModel.js'

export const protect = async (req, res, next) => {
    let token = req.cookies.jwt

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
            //decoded will return an object of all user credentials

            req.user = await User.findById(decoded.userId).select('-password')
            //this will return all user credentials including password; .select('-password') makes it to not return the user password in API

            next()
        } catch (error) {
            res.status(401).json({ message: 'Not authorized - invalid token.', error })
        }
    } else {
        res.status(401).json({ message: 'Not authorized - no token.' })

    }
}