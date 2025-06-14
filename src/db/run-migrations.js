const pool = require('../config/database');
const { createAgentsTable, createFarmersTable } = require('./migrations');

const runMigrations = async () => {
    const client = await pool.connect();
    try {
        console.log('Starting database migrations...');

        await client.query(createAgentsTable);
        console.log('Successfully created "agents" table.');

        await client.query(createFarmersTable);
        console.log('Successfully created "farmers" table.');

        console.log('Database migrations completed successfully.');
    } catch (error) {
        console.error('Error running migrations:', error);
        // Exit the process with an error code if migrations fail
        process.exit(1);
    } finally {
        client.release();
    }
};

// If this script is run directly, execute the migrations
if (require.main === module) {
    runMigrations();
}

module.exports = runMigrations;
