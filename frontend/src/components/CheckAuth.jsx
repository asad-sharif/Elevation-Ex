import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const CheckAuth = ({ authenticated, user, children }) => {
    const { pathname } = useLocation()    

    // if (!authenticated) {
    //     return <Navigate to='/' />
    // }

    if (authenticated) {
        if (user.role === 'admin' && !pathname.includes('/admin')) {
            return <Navigate to='/admin' replace />
        }

        if (user.role !== 'admin' && pathname.includes('/admin')) {
            return <Navigate to='/unauthorized' replace />
        }
    }

    return children
}

export default CheckAuth