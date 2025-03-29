// src/routes/courseRoutes.js
const express = require('express');

const { createmessage, getMessages, updateMessages, deleteMessage } = require('../controllers/messagesController');
const authMiddleware = require('../middleware/authMiddleware');



const router = express.Router();

router.post('/',createmessage);

router.get('/',authMiddleware, getMessages);

router.patch('/', updateMessages);
router.delete('/', deleteMessage);


module.exports = router;
