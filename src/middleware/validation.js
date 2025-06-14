const { body, validationResult } = require('express-validator');

// Validation rules for contact form
exports.contactValidationRules = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
        
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please enter a valid email address'),
        
    body('message')
        .trim()
        .notEmpty().withMessage('Message is required')
        .isLength({ min: 10 }).withMessage('Message must be at least 10 characters long')
];

// Validation rules for agent signup form
exports.agentSignupValidationRules = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
        
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please enter a valid email address'),
        
    body('phone')
        .trim()
        .notEmpty().withMessage('Phone number is required')
        .matches(/^[0-9\-+()\s]+$/).withMessage('Please enter a valid phone number'),
        
    body('location')
        .trim()
        .notEmpty().withMessage('Location is required'),
        
    body('experience')
        .optional({ checkFalsy: true })
        .isInt({ min: 0 }).withMessage('Experience must be a positive number')
];

// Middleware to handle validation errors
exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
    
    return res.status(422).json({
        success: false,
        message: 'Validation failed',
        errors: extractedErrors
    });
};
