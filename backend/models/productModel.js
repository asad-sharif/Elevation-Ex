import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
    name: String,
    headline: String,
    description: String,
    image: String,
    category: String,
    quantity: Number,
    isPopular: Boolean,
    rating: Number,
    price: Number,
    customerReviews: String
},
    { timestamps: true })

productSchema.statics.countAll = async function () {
        return await this.countDocuments()
    }

export const Product = mongoose.model('Product', productSchema)