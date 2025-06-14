const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Test database connection
router.get('/test-db', async (req, res) => {
    console.log('Testing database connection...');
    try {
        const result = await db.testConnection();
        
        if (result.success) {
            console.log('Database test successful');
            return res.status(200).json({
                status: 'success',
                message: 'Database connection successful',
                data: result
            });
        } else {
            console.error('Database test failed:', result);
            return res.status(500).json({
                status: 'error',
                message: 'Database connection failed',
                error: {
                    message: result.error,
                    code: result.code,
                    errno: result.errno,
                    sqlState: result.sqlState,
                    sqlMessage: result.sqlMessage
                },
                details: 'Please check if MySQL is running and the credentials in .env are correct.'
            });
        }
    } catch (error) {
        console.error('Unexpected error during database test:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Unexpected error during database test',
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

module.exports = router;
