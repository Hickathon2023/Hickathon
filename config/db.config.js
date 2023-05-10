const { Pool } = require('pg');

const pool = new Pool({
	user: 'user',
	host: 'localhost',
	database: 'database',
	password: 'password',
	port: 3000,
});

module.exports = pool;