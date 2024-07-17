const express = require('express');
const router = express.Router();
const Seller = require('../controllers/sellers/sellerController');
const Record = require('../controllers/sellers/sellerRecord');
const product = require('../controllers/sellers/productStore');

router.put('/seller-register', Seller.SellerRegister);
router.post('/seller-login', Seller.SellerLogin);
router.put('/seller-profile', Record.sellerProfile);
router.post('/seller-details', Record.sellerRetrival);
router.put('/add-new-product', product.AddProduct);
router.put('/view-products', product.ViewProducts);
router.put('/product-update', product.updateDetails);
router.get('/remove-product', product.RemoveProducts);
router.get('/product-details', product.productDetails);
module.exports = router;