const express = require('express');
const { StatusCodes } = require('http-status-codes');
const pool = require('../config/database');

const router = express.Router();

// GET /api/db-check
router.get('/db-check', async (req, res) => {
    console.log('Request received for /api/db-check');
    try {
        const query = `
            SELECT tablename 
            FROM pg_catalog.pg_tables 
            WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema';
        `;
        
        const result = await pool.query(query);
        const tables = result.rows.map(row => row.tablename);

        console.log('Tables found:', tables);

        res.status(StatusCodes.OK).json({
            status: 'success',
            message: 'Database tables retrieved successfully.',
            tables: tables
        });

    } catch (error) {
        console.error('Error checking database tables:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'error',
            message: 'Failed to check database tables.',
            error: error.message
        });
    }
});

module.exports = router;
