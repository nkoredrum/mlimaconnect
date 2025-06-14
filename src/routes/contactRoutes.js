const express = require('express');
const { StatusCodes } = require('http-status-codes');

const router = express.Router();

// POST /api/contact
router.post('/contact', (req, res) => {
    console.log('Received contact form message:');
    console.log(req.body);

    // In a real application, you would send an email or save this to a database.
    // For now, we'll just send a success response.

    res.status(StatusCodes.OK).json({
        status: 'success',
        message: 'Contact message received successfully.',
        data: req.body
    });
});

module.exports = router;
