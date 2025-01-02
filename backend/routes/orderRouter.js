import express from "express";
import { countOrders, getOrders, placeOrder } from "../controllers/orderController.js";

const orderRouter = express.Router()

// orderRouter.post('/', placeOrder)
// orderRouter.get('/', getOrders)

//same as above
orderRouter.route('/')
    .post(placeOrder)
    .get(getOrders)

orderRouter.get('/count', countOrders)

export default orderRouter