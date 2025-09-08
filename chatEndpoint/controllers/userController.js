const db = require('../src/db');

exports.getAllUsers = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT id, full_name, email FROM users');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch users' });
    }
};