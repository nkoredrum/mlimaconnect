const express = require('express');
const { StatusCodes } = require('http-status-codes');
const { createAgentsTable, createFarmersTable } = require('../db/migrations');
const pool = require('../config/database');

const router = express.Router();

// This is a temporary route to manually run migrations
// In production, this should be run during deployment, not on-demand
router.get('/migrate', async (req, res) => {
    if (process.env.NODE_ENV === 'production' && req.hostname !== 'localhost') {
        return res.status(StatusCodes.FORBIDDEN).json({
            status: 'error',
            message: 'Migrations can only be run manually in development.'
        });
    }

    try {
        // Run the migration queries
        await pool.query(createAgentsTable);
        await pool.query(createFarmersTable);

        // Verify the tables were created
        const result = await pool.query(`
            SELECT tablename 
            FROM pg_catalog.pg_tables 
            WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema';
        `);

        const tables = result.rows.map(row => row.tablename);

        res.status(StatusCodes.OK).json({
            status: 'success',
            message: 'Database migrations completed successfully.',
            tables: tables
        });
    } catch (error) {
        console.error('Migration error:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'error',
            message: 'Failed to run migrations.',
            error: error.message
        });
    }
});

module.exports = router;
