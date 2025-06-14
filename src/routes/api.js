const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');
const { 
    contactValidationRules, 
    agentSignupValidationRules, 
    validate 
} = require('../middleware/validation');

// Contact form submission
router.post(
    '/contact',
    contactValidationRules,
    validate,
    formController.submitContactForm
);

// Agent signup form submission
router.post(
    '/agent/signup',
    agentSignupValidationRules,
    validate,
    formController.submitAgentSignup
);

module.exports = router;
