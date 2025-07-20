const db = require('../src/db');

function socketHandler(io) {
    io.on('connection', (socket) => {
        console.log('User connected');

        socket.on('joinChannel', (channelId) => {
            socket.join(`channel_${channelId}`);
        });

        socket.on('sendMessage', async ({ channelId, userId, content }) => {
            try {
                const [result] = await db.execute(
                    'INSERT INTO channel_messages (channel_id, sender_id, content) VALUES (?, ?, ?)',
                    [channelId, userId, content]
                );

                const message = {
                    id: result.insertId,
                    channel_id: channelId,
                    sender_id: userId,
                    content,
                    created_at: new Date()
                };

                io.to(`channel_${channelId}`).emit('newMessage', message);
            } catch (err) {
                console.error('Error sending message:', err);
            }
        });

        socket.on('sendDirectMessage', async ({ receiverId, content }) => {
            try {
                const [result] = await db.execute(
                    'INSERT INTO direct_messages (sender_id, receiver_id, content) VALUES (?, ?, ?)',
                    [1, receiverId, content]
                );

                const message = {
                    id: result.insertId,
                    sender_id: 1,
                    receiver_id: receiverId,
                    content,
                    created_at: new Date()
                };

                io.to(`user_${receiverId}`).emit('newDirectMessage', message);
            } catch (err) {
                console.error('Error sending direct message:', err);
            }
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
}

module.exports = socketHandler;
