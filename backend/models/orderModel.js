import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subject: { type: String, required: true },

    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: Number, 
            price: Number
        }
    ],
    orderStatus: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
})

orderSchema.statics.countAll = async function () {
    return await this.countDocuments()
}

export const Order = mongoose.model('Order', orderSchema)