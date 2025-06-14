const createAgentsTable = `
CREATE TABLE IF NOT EXISTS agents (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    location VARCHAR(255) NOT NULL,
    experience TEXT,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    application_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
`;

const createFarmersTable = `
CREATE TABLE IF NOT EXISTS farmers (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(150) NOT NULL,
    last_name VARCHAR(150) NOT NULL,
    phone_number VARCHAR(50) UNIQUE NOT NULL,
    location VARCHAR(255) NOT NULL,
    farm_size_acres DECIMAL(10, 2),
    primary_crop VARCHAR(100),
    date_joined TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
`;

module.exports = {
    createAgentsTable,
    createFarmersTable
};
