import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    products: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const { productId, quantity, orderSubject } = action.payload

            const indexProductId = (state.products).findIndex(product => product.id === productId)
            if (indexProductId >= 0) {
                state.products[indexProductId].quantity += quantity
            } else {
                state.products.push({ id: productId, quantity, orderSubject })
            }
        },
        clearCart(state, action) {
            state.products = []
        }
    }
})

export default cartSlice.reducer
export const { addToCart, clearCart } = cartSlice.actions