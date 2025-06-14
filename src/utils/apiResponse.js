class ApiResponse {
    constructor(statusCode, data, message = 'Success') {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }
}

const successResponse = (res, data, message = 'Success', statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data
    });
};

const errorResponse = (res, message = 'Internal Server Error', statusCode = 500, error = {}) => {
    return res.status(statusCode).json({
        success: false,
        message,
        error: process.env.NODE_ENV === 'development' ? error : {}
    });
};

const validationError = (res, errors) => {
    return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: errors.array()
    });
};

const notFoundError = (res, message = 'Resource not found') => {
    return res.status(404).json({
        success: false,
        message
    });
};

const unauthorizedError = (res, message = 'Unauthorized') => {
    return res.status(401).json({
        success: false,
        message
    });
};

const forbiddenError = (res, message = 'Forbidden') => {
    return res.status(403).json({
        success: false,
        message
    });
};

module.exports = {
    ApiResponse,
    successResponse,
    errorResponse,
    validationError,
    notFoundError,
    unauthorizedError,
    forbiddenError
};
