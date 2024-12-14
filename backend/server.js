import express from 'express'
import { userRouter } from './routes/userRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import { connectDB } from './config/db.js'
import cookieParser from 'cookie-parser'

const PORT = process.env.PORT || 5000

const app = express()
connectDB()

// cookie-parser middleware
app.use(cookieParser())

// middlewares
// PUT and POST middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// routes
app.use('/api/user/', userRouter)


// error handling middlewares
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`))