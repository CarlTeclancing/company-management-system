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

// === Allow CORS from all origins ===
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());

// === Create server ===
const server = http.createServer(app);

// === Socket.io with CORS ===
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }
});

// Init socket handler
socketHandler(io);

// === API Routes ===
app.use('/api/channels', channelRoutes);
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);

// Root check
app.get('/', (req, res) => {
  res.send('Chat API running...');
});

// === Start server ===
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
