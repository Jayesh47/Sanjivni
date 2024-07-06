const express = require('express');
const router = express.Router();
const customer = require('../controllers/userController');

router.post('/user-register', customer.Register);
router.post('/user-login', customer.userLogin);

module.exports = router; 