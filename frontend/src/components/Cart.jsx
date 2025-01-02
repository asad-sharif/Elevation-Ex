import { Box, Drawer, Typography, Button, TextField } from '@mui/material';
import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaWhatsapp, FaLinkedinIn, FaInstagram, FaRegEnvelope } from 'react-icons/fa';
import { theme } from '@/theme';
import { addToCart, clearCart } from '@/slices/cartSlice.js';
import axios from 'axios';
import { Notification, useToaster } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';

const Cart = ({ openCart, toggleCart }) => {
    const [cartedProducts, setCartedProducts] = useState([]);
    const [orderSubject, setOrderSubject] = useState('')
    const [userId, setUserId] = useState()
    // const [quantity, setquantity] = useState();
    const id = useSelector(state => state.login?.user?.id)
    const userName = useSelector(state => state.login?.user?.name);
    const cart = useSelector(state => state.cart.products);
    const productIds = cart.map(item => item.id);

    const toast = useToaster()
    const dispatch = useDispatch() 

    useEffect(() => {
        async function fetchCartProducts() {
            try {
                const response = await fetch('http://localhost:8000/api/products/by-ids', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ productIds }),
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }

                const data = await response.json();
                setCartedProducts(data.products);

                // Map quantities from cart to cartedProducts
                const updatedProducts = data.products.map(product => {
                    const cartItem = cart.find(item => item.id === product._id);
                    return {
                        ...product,
                        quantity: cartItem ? cartItem.quantity : product.quantity, // Add quantity if available
                    };
                });

                setCartedProducts(updatedProducts);
            } catch (error) {
                console.error('Error fetching cart products:', error);
            }
        }

        if (productIds.length > 0) {
            fetchCartProducts();
        }
    }, [cart]);

    async function handleCheckout() {
        if (orderSubject.length <= 0) {
            alert('Order Subject in the cart is required')
            return
        }

        try {
            const response = await axios.post('http://localhost:8000/api/orders/', { id, orderSubject, cartedProducts })

            toast.push(
                <Notification type='success' header={`Thank you, ${userName}`}>
                    Your order has been sent to the manufecturer!
                </Notification> ,
                { placement: 'bottomEnd', duration: 5000 }
            )


            // setting user id
            // setUserId(id)

            // clear the redux state
            dispatch(clearCart())

            //clear order subject
            setOrderSubject('')

            //close the drawer
            toggleCart(false)

            // clear the cart
            setCartedProducts([])

        } catch (error) {
            console.error('Failed to place order.', error);
        }
    }

    // console.log(orderSubject);

    return (
        <Drawer
            variant="temporary"
            anchor="right"
            open={openCart}
            onClose={() => toggleCart(false)}
        >
            <Box
                sx={{
                    height: '100%',
                    width: { xs: '300px', md: '400px' },
                    p: '2rem 1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'stretch',
                }}
            >
                {cartedProducts.length > 0 ? (
                    <>
                        <Typography variant="h5" component="h2">Shopping Cart</Typography>

                        <TextField
                            id="orderSubject"
                            label="Your Order Subject"
                            value={orderSubject}
                            onChange={(e) => setOrderSubject(e.target.value)}
                            size='small'
                            required
                            sx={{ mt: '1rem' }}
                            inputProps={{ maxLength: 30 }}
                        />

                        <Box sx={{ bgcolor: 'rgba(255, 0, 0, 0.05)', boxShadow: '2px 2px 10px rgba(0,0,0,0.3)', borderRadius: '10px', height: '100%', my: '1rem', overflowY: 'auto' }}>
                            {cartedProducts.map((product, index) => (
                                <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: { xs: '0.5rem 0.9rem', md: '1rem 1.2rem' }, borderBottom: '1px solid #9999' }}>
                                    <img src={product.image} alt="" className='w-24 h-16 md:w-32 md:h-20 rounded-md object-center object-cover' />

                                    <Box>
                                        <Typography variant="h6">{product.name}</Typography>
                                        <Typography variant="body1">${product.price * product.quantity}</Typography>
                                        <Typography variant="body2">{product.quantity} units</Typography>
                                    </Box>
                                </Box>
                            ))}


                        </Box>
                    </>
                ) : (
                    <Typography variant="h5" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>No products carted yet!</Typography>
                )}

                {/* CHECKOUT ------------------------------------------------------------------------------------ */}
                {cartedProducts.length > 0 && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', alignItems: 'center' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ width: '100%' }}
                            onClick={handleCheckout}
                        >
                            Check Out
                        </Button>
                        <div className="w-full text-center">
                            <p className="font-semibold text-black">Talk directly to the manufacturer</p>
                            <div className="flex flex-row items-center justify-center gap-8 mt-3">
                                <a href="mailto:info@gog-industry.com" className="flex items-center gap-2" rel="noopener noreferrer" aria-label="Email">
                                    <FaRegEnvelope className="text-xl" />
                                </a>
                                <a href="https://wa.me/+923001234567" className="flex items-center gap-2" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                                    <FaWhatsapp className="text-xl" />
                                </a>
                                <a href="#" className="flex items-center gap-2" onClick={(e) => e.preventDefault()} aria-label="LinkedIn">
                                    <FaLinkedinIn className="text-xl" />
                                </a>
                                <a href="#" className="flex items-center gap-2" onClick={(e) => e.preventDefault()} aria-label="Instagram">
                                    <FaInstagram className="text-xl" />
                                </a>
                            </div>
                        </div>
                    </Box>
                )}
            </Box>
        </Drawer>
    );
};

export default Cart;
