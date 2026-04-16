const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

// Create user
router.post('/create', userController.createUser);

// Example: Get user (add later)
router.get('/:id', userController.getUserById);
router.put('/update', userController.updateUser);

module.exports = router;