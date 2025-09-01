const express = require('express');
const router = express.Router();
const channelController = require('../controllers/channelController');
const messageController = require('../controllers/messageController');

//const directMessageController = require('../controllers/directMessageController');

router.get('/', channelController.getAllChannels);
router.get('/:id/messages', messageController.getChannelMessages);



// Direct (individual) message routes
//router.get('/direct/:user1/:user2', directMessageController.getDirectMessages);
//router.post('/direct', directMessageController.createDirectMessage);


module.exports = router;