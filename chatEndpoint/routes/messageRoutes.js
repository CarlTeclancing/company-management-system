const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const {createDirectMessage, getDirectMessages } = require('../controllers/messageController');

// Route: Get messages for a specific channel
router.get('/channels/:id/messages', messageController.getChannelMessages);

// Direct (individual) message routes
router.get('/direct/:user1/:user2', getDirectMessages);
router.post('/direct', createDirectMessage);

module.exports = router;
