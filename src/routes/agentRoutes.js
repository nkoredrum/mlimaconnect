const express = require('express');
const { StatusCodes } = require('http-status-codes');
const pool = require('../config/database');

const router = express.Router();

// POST /api/agents
router.post('/agents', async (req, res) => {
    const { fullName, phoneNumber, email, location, experience } = req.body;

    if (!fullName || !phoneNumber || !email || !location) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: 'error',
            message: 'Missing required fields: fullName, phoneNumber, email, and location are required.'
        });
    }

    try {
        const query = `
            INSERT INTO agents (full_name, phone_number, email, location, experience)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, full_name, status, application_date;
        `;
        const values = [fullName, phoneNumber, email, location, experience];

        const result = await pool.query(query, values);
        const newAgent = result.rows[0];

        console.log('Successfully saved new agent application:', newAgent);

        res.status(StatusCodes.CREATED).json({
            status: 'success',
            message: 'Agent application submitted successfully.',
            data: newAgent
        });
    } catch (error) {
        console.error('Error saving agent application:', error);

        // Check for unique constraint violation (e.g., duplicate email or phone)
        if (error.code === '23505') { // PostgreSQL unique violation error code
            return res.status(StatusCodes.CONFLICT).json({
                status: 'error',
                message: `An application with this email or phone number already exists.`
            });
        }

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'error',
            message: 'An internal error occurred. Please try again later.'
        });
    }
});

module.exports = router;
