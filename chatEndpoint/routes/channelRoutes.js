const express = require('express');
const router = express.Router();
const channelController = require('../controllers/channelController');
const messageController = require('../controllers/messageController');

router.get('/', channelController.getAllChannels);
router.get('/:id/messages', messageController.getChannelMessages);

module.exports = router;
