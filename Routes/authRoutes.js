const express = require('express');
const router = express.Router();

const authController = require('../Controllers/AuthController/AuthController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/check-token', authController.checkToken);

module.exports = router;