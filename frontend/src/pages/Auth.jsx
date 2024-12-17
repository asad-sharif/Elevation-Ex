import { Box } from '@mui/material'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import image from '../assets/authbg.jpg'

const Auth = () => {
    return (
        <Box sx={{ display: 'flex', height: '100vh', width: '100%' }}>
            <Box sx={{ flex: '1', display: { xs: 'none', md: 'flex' }, justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                <Box sx={{ width: '100%', height: '100%', position: 'absolute' }}>
                    <img src={image} alt="" className='w-full h-full object-cover object-center' />
                </Box>
                {/* dark overlay */}
                <Box sx={{ width: '100%', height: '100%', bgcolor: 'rgba(0,0,0,0.4)', position: 'absolute', top: '0' }}></Box>
            </Box>

            <Box sx={{ flex: '1', my: {xs:'2.5rem', md: '0'} }}>
                <Outlet />
            </Box>
        </Box>
    )
}

export default Auth