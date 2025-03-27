const express = require('express');
const { createUser, signInUser } = require('../controllers/authController');


const router = express.Router();

router.post('/register', createUser);
router.post('/login', signInUser);

module.exports = router;