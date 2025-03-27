// src/routes/courseRoutes.js
const express = require('express');

const { createmessge, getMessages, updateMessages, deleteMessage } = require('../controllers/messagesController');


const router = express.Router();

router.post('/', createmessge);

router.get('/', getMessages);

router.patch('/', updateMessages);
router.delete('/', deleteMessage);


module.exports = router;
