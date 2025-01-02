import { Order } from "../models/orderModel.js"

// POST palce the order from user
export const placeOrder = async (req, res) => {
    const { id, orderSubject, cartedProducts } = req.body
 
    try {
        const newOrder = await Order.create({
            userId: id,
            subject: orderSubject,
            products: cartedProducts.map(product => ({
                productId: product._id,
                quantity: product.quantity,
                price: product.price
            })),
        })

        if (newOrder) {
            return res.status(201).json({ message: 'Order placed succesfully.', newOrder })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Failed to place order.', error })
    }
}

// GET fetch the orders for admin
export const getOrders = async (req, res) => {
    const orders = await Order.find({})
        .populate('userId', 'name email')
        .populate('products.productId', 'name price image')
        .sort({createdAt: -1})
    
    try {
        if (orders) {
            return res.status(200).json({ message: 'Here are your orders:', orders })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Could not get the orders', error })
    }
}

// count all orders
export const countOrders = async (req, res) => {
    try {
        const totalOrders = await Order.countAll()
        return res.status(200).json({ totalOrders })
    } catch (error) {
        return res.status(500).json({ message: 'Failed to get the count of all orders', error })
    }
}