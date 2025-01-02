import express from "express"
import { countProducts, createProduct, deleteProduct, getProducts, getProductsByIds, getSingleProduct, updateProduct } from "../controllers/productControllers.js"


export const productRouter = express.Router()

productRouter.get('/count', countProducts )
productRouter.post('/', createProduct )
productRouter.put('/:id', updateProduct )
productRouter.get('/', getProducts)
productRouter.get('/:id', getSingleProduct)
productRouter.post('/by-ids', getProductsByIds);
productRouter.delete('/:id', deleteProduct)