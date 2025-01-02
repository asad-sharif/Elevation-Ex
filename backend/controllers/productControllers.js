import { Product } from "../models/productModel.js"



// @desc create new product
// route POST /api/products/create
// @access Admin
export const createProduct = async (req, res) => {
    const product = await Product.create(req.body)

    if (product) {
        return res.status(201).json({ message: 'Product created successfully', ProductData: product })
    } else {
        return res.status(400).json({ message: 'Product creation failed' })
    }
}

// @desc update product
// route PUT /api/products/update/:id
// @access Admin
export const updateProduct = async (req, res) => {
    const { name, headline, description, image, category, isPopular, rating, price, customerReviews } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        product.name = name || product.name
        product.headline = headline || product.headline
        product.description = description || product.description
        product.image = image || product.image
        product.category = category || product.category
        product.isPopular = isPopular || product.isPopular
        product.rating = rating || product.rating
        product.price = price || product.price
        product.customerReviews = customerReviews || product.customerReviews

        const updatedProduct = await product.save()
        return res.status(201).json({ message: 'Product updated successfuly', UpdatedProduct: updatedProduct })
    } else {
        return res.status(400).json({ message: 'Product not found' })
    }
}

// @desc Get multiple products by IDs
// route POST /api/products/by-ids
// @access Public
export const getProductsByIds = async (req, res) => {
    const { productIds } = req.body; // Expecting an array of IDs in the request body

    if (!productIds || !Array.isArray(productIds)) {
        return res.status(400).json({ message: 'Invalid product IDs' });
    }

    try {
        const products = await Product.find({ _id: { $in: productIds } }); // Fetch products matching the IDs
        return res.status(200).json({ products });
    } catch (error) {
        console.error('Error fetching products by IDs:', error);
        return res.status(500).json({ message: 'Server error', error });
    }
};


// @desc Get single product
// route GET /api/products/:id
// @access Admin
export const getSingleProduct = async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        return res.status(200).json({ product })
    } else {
        return res.status(400).json({ message: 'Product not found' })
    }
}

// @desc Get all products
// route GET /api/products/
// @access Admin
export const getProducts = async (req, res) => {
    const products = await Product.find({})

    try {
        if (products) {
            return res.status(200).json({ message: 'Products retrived successfully', products })
        }
    } catch (error) {
        return res.status(400).json({ message: 'Failed to get products.', error })
    }
}

// @desc delete product
// route DELETE /api/products/:id
// @access Admin
export const deleteProduct = async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id)

    if (product) {
        return res.status(200).json({ message: 'Product deleted successfully' })
    } else {
        return res.status(400).json({ message: 'Product not found' })
    }
}

// @desc get products count
// route GET /api/products/count
// @access Admin
export const countProducts = async (req, res) => {
    try {
        const totalProducts = await Product.countAll()
        return res.status(200).json({ totalProducts })
    } catch (error) {
        res.status(400).json({ message: 'Product count error.', Error: error })
    }
}