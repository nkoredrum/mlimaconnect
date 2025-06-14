const { validationResult } = require('express-validator');
const AppError = require('../utils/appError');
const { successResponse, validationError } = require('../utils/apiResponse');
const catchAsync = require('../utils/catchAsync');

// Handle contact form submission
exports.submitContactForm = catchAsync(async (req, res, next) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return validationError(res, errors);
    }

    const { name, email, message } = req.body;
    
    // In a real app, you would:
    // 1. Save to database
    // 2. Send confirmation email
    // 3. Log the submission
    
    console.log('New contact form submission:', { name, email, message });
    
    // Send success response
    successResponse(
        res,
        { name, email },
        'Thank you for contacting us! We will get back to you soon.'
    );
});

// Handle agent signup form submission
exports.submitAgentSignup = catchAsync(async (req, res, next) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return validationError(res, errors);
    }

    const { name, email, phone, location, experience } = req.body;
    
    // In a real app, you would:
    // 1. Save to database
    // 2. Send confirmation email
    // 3. Notify admin
    
    console.log('New agent signup:', { name, email, phone, location, experience });
    
    // Send success response
    successResponse(
        res,
        { name, email, phone },
        'Thank you for your interest in becoming an agent! We will contact you soon.'
    );
});
