const express = require('express');
const router = express.Router();
const Seller = require('../controllers/sellers/sellerController');
const Record = require('../controllers/sellers/sellerRecord');

router.put('/seller-register', Seller.SellerRegister);
router.post('/seller-login', Seller.SellerLogin);
router.put('/seller-profile', Record.sellerProfile);
router.post('/seller-details', Record.sellerRetrival);
module.exports = router;