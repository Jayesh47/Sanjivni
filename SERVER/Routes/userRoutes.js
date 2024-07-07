const express = require('express');
const router = express.Router();
const customer = require('../controllers/users/userController');
const { UserRecords } = require('../controllers/users/userRecord');

router.post('/user-login', customer.userLogin);
router.put('/user-register', customer.Register);
router.get('/user-record', UserRecords);

module.exports = router; 