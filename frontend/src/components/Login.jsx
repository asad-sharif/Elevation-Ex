import { Box } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    function handleChange(e) {
        const { name, value } = e.target

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()

        console.log('Submitted formdata:', formData);
        

        //clear the form data
        setFormData({
            email: '',
            password: ''
        })
    }

    return (
        <Box sx={{ display: 'flex', height: '100vh', width: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', px: '2rem' }}>
            <form className='md:w-3/4' onSubmit={handleSubmit}>
                <h2 className='text-gray-900 text-2xl text-center font-medium title-font mb-3'>
                    Welcome back!
                </h2>
                <h3 className='mb-8 text-center'>New here?
                    <Link to='/auth' className='mx-1 font-semibold hover:underline'>Sign Up</Link>
                    and create an account.
                </h3>

                <div className='relative mb-4'>
                    <label htmlFor='email' className='leading-7 text-sm text-gray-600'>Email</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                        required
                    />
                </div>

                <div className='relative mb-4'>
                    <label htmlFor='password' className='leading-7 text-sm text-gray-600'>Password</label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                        required
                    />
                </div>

                <button type='submit' className='text-white w-full bg-gradient-to-r from-red-700 to bg-red-900 border-0 py-2 px-6 focus:outline-none hover:bg-red-800 rounded text-lg'>
                    Sign in
                </button>
                <p className='text-xs text-gray-500 mt-3'>
                    By creating an account, you agree to our
                    <Link to="/terms-and-conditions" className='mx-1 underline'>Terms and Conditions</Link>
                    and
                    <Link to="/privacy-policies" className='mx-1 underline'>Privacy Policy</Link>.
                </p>
            </form>
        </Box>
    )
}

export default Login