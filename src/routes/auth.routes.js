const express = require('express');
const router = express.Router();

const authControler = require('../controllers/auth.controller');

// Create user
router.post('/login', authControler.login);

// Example: Get user (add later)


module.exports = router;