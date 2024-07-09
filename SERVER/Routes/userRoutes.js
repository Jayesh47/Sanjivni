const express = require('express');
const router = express.Router();
const customer = require('../controllers/users/userController');
const UserRecords = require('../controllers/users/userRecord');

router.post('/user-login', customer.userLogin);
router.put('/user-register', customer.Register);
router.post('/user-record', UserRecords.UserRecords);
router.get('/user-details', UserRecords.UserDetails);
router.put('/user-forgot', UserRecords.UserForgot);

module.exports = router; 