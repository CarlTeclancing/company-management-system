const express = require('express')
const { saveMessage, getAllMessages, getMessageById, deleteMessage } = require('../controllers/contactController')
const router = express.Router()

router.route("/")
.post(saveMessage)
.get(getAllMessages)

router.route("/:id")
.get(getMessageById)
.delete(deleteMessage)

module.exports = router