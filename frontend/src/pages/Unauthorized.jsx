import React from 'react'
import { Link } from 'react-router-dom'

const Unauthorized = () => {
    return (
        <div className='w-full h-screen flex flex-col justify-center items-center gap-4 text-center'>
            <h1 className='text-3xl font-light'>401 - You are not authorized</h1>
            <Link to='..' className='underline'>Back to home page</Link>
        </div>
    )
}

export default Unauthorized