import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import whatsapp from '../assets/whatsapp.png'

const HomeLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
            <Box sx={{ position: 'fixed', bottom: '2rem', right: '2rem', width: { xs: '40px', md: '50px' }, height: { xs: '40px', md: '50px' }, zIndex: '50' }}>
                <a href="https://wa.me/+923001234567" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                    <img src={whatsapp} alt="" />
                </a>
                {/* the phone number should be in international format without any spaces and special characters */}
            </Box>
        </>
    )
}

export default HomeLayout