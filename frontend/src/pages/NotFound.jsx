import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
      <div className='w-full h-screen flex flex-col justify-center items-center gap-4'>
          <h1 className='text-3xl font-light'>404 - Not Found</h1>
          <Link to='..' className='underline'>Back to home page</Link>
      </div>
  )
}

export default NotFound