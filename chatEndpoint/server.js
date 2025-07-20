require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const db = require('./src/db');
const socketHandler = require('./socket/socketHandler');

const channelRoutes = require('./routes/channelRoutes');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

socketHandler(io); // init socket

// === API Routes ===
app.use('/api/channels', channelRoutes);
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);

app.get('/', (req, res) => res.send('Chat API running...'));

server.listen(process.env.PORT || 8000, () => {
    console.log(`Server running on port ${process.env.PORT || 8000}`);
});
