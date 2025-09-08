const db = require('../src/db');

exports.getAllChannels = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT id, name, description FROM channels');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch channels' });
    }
};