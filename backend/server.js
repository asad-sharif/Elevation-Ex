import express from 'express'
import { userRouter } from './routes/userRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import { connectDB } from './config/db.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { productRouter } from './routes/productRoutes.js'
import orderRouter from './routes/orderRouter.js'

const PORT = process.env.PORT || 8000

const app = express()
connectDB()

// Allow requests from your frontend origin
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, // If you're using cookies or Authorization headers
}));

// cookie-parser middleware
app.use(cookieParser())

// middlewares
// PUT and POST middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// routes
app.use('/api/user/', userRouter)
app.use('/api/products/', productRouter)
app.use('/api/orders/', orderRouter)


// error handling middlewares
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`))