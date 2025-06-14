const { Pool } = require('pg');

const pool = new Pool({
  // The DATABASE_URL environment variable will be provided by Render.
  connectionString: process.env.DATABASE_URL,
  // For production environments on Render, SSL is required.
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Function to test the database connection
async function testConnection() {
    let client;
    try {
        client = await pool.connect();
        console.log('✅ PostgreSQL database connected successfully.');
        return { success: true, message: 'PostgreSQL database connected successfully.' };
    } catch (error) {
        console.error('❌ Database connection failed:', error);
        return { success: false, message: 'Database connection failed.', error };
    } finally {
        // Make sure to release the client back to the pool
        if (client) {
            client.release();
        }
    }
}

module.exports = {
  // A simple query function
  query: (text, params) => pool.query(text, params),
  // The test function
  testConnection,
  // Export the pool itself for more complex transactions
  pool,
};
