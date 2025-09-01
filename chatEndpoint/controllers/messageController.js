const db = require('../src/db');

exports.getChannelMessages = async (req, res) => {
    const channelId = req.params.id;
    try {
        const [rows] = await db.execute(
            `SELECT id, channel_id, sender_id, content, created_at
             FROM channel_messages
             WHERE channel_id = ?
             ORDER BY created_at ASC`,
            [channelId]
        );
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch messages' });
    }
};
exports.createChannelMessage = async (req, res) => {
    const { channelId, senderId, content } = req.body;
    try {
        const [result] = await db.execute(
            'INSERT INTO channel_messages (channel_id, sender_id, content) VALUES (?, ?, ?)',
            [channelId, senderId, content]
        );
        res.status(201).json({
            id: result.insertId,
            channel_id: channelId,
            sender_id: senderId,
            content,
            created_at: new Date()
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to create message' });
    }
};


// Get messages between two users (DMs)
exports.getDirectMessages = async (req, res) => {
    const { user1, user2 } = req.params;
    try {
        const [rows] = await db.execute(
            `SELECT id, sender_id, receiver_id, content, created_at
             FROM direct_messages
             WHERE (sender_id = ? AND receiver_id = ?)
                OR (sender_id = ? AND receiver_id = ?)
             ORDER BY created_at ASC`,
            [user1, user2, user2, user1]
        );
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch direct messages' });
    }
};

// Create a new direct message
exports. createDirectMessage = async (req, res) => {
    const { senderId, receiverId, content } = req.body;
    try {
        const [result] = await db.execute(
            `INSERT INTO direct_messages (sender_id, receiver_id, content)
             VALUES (?, ?, ?)`,
            [senderId, receiverId, content]
        );
        res.status(201).json({
            id: result.insertId,
            sender_id: senderId,
            receiver_id: receiverId,
            content,
            created_at: new Date()
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to send message' });
    }
};
