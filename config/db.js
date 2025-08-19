const mysql = require('mysql2/promise'); // use promise-based API

// Immediately create and export a pool or connection
const connection = mysql.createPool({ // prefer pool for scalability
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// Optional: test connection (recommended for startup logs)
async function testConnection() {
  try {
    const conn = await connection.getConnection();
    console.log('Connected to MySQL Database');
    conn.release(); // release back to pool
  } catch (err) {
    console.error('MySQL Connection Error:', err);
  }
}

testConnection();

module.exports = connection;
