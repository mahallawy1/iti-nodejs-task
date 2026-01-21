const APIError = require('../utils/APIError');

const errorHandler = (err, req, res, next) => {
    if (err instanceof APIError) {
        return res.status(err.statusCode).json({
            message: err.message,
            success: false,
            isClientError: err.isClientError
        });
    }

    if (err.name === 'CastError') {
        return res.status(400).json({
            message: `Invalid ${err.path}: ${err.value}`,
            success: false,
            isClientError: true
        });
    }

    if (err.name === 'MongoServerError' && err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        return res.status(400).json({
            message: `Duplicate value for field: ${field}`,
            success: false,
            isClientError: true
        });
    }

    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(e => e.message);
        return res.status(400).json({
            message: messages.join(', '),
            success: false,
            isClientError: true
        });
    }

    console.error('Unexpected Error:', err);
    return res.status(500).json({
        message: 'Internal Server Error',
        success: false,
        isClientError: false
    });
};

module.exports = errorHandler;