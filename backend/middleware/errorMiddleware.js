//when there is no searched route defined
export const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

//when there is some error in defined routes
export const errorHandler = (err, req, res, next) => {
    let statusCode = req.statusCode === 200 ? 500 : res.statusCode
    let message = err.message

    //this check is specifically for mongoose errors; it'll fire off if you try to get the user whose id does not exist
    if (err.name === 'CastError' && err.kind === 'Objectid') {
        statusCode = 404
        message = 'Resource not found'
    }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })

}