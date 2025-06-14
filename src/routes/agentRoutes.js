const express = require('express');
const { StatusCodes } = require('http-status-codes');

const router = express.Router();

// POST /api/agents
router.post('/agents', (req, res) => {
    console.log('Received agent application:');
    console.log(req.body);

    // In a real application, you would save this to the database
    // For now, we'll just send a success response

    res.status(StatusCodes.CREATED).json({
        status: 'success',
        message: 'Agent application received successfully.',
        data: req.body
    });
});

module.exports = router;
