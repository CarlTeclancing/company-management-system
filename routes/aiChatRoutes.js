const express = require('express');
const router = express.Router();
const { askAi } = require("../controllers/aichatController");



// POST /api/ai-chat
router.post("/", askAi);

module.exports = router;
