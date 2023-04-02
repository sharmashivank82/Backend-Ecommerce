const express = require('express');
const router = express.Router();

const CheckoutController = require('../Controllers/UserController/CheckoutController');
const ProductController = require('../Controllers/AdminController/ProductController');
const UserMiddleware = require('../MiddleWare/userMiddleware');
const CouponController = require('../Controllers/AdminController/CouponController');

router.get('/product-list',UserMiddleware.checkUserLogin, ProductController.getProductListing);

router.post('/checkout',UserMiddleware.checkUserLogin, CheckoutController.createCheckout);
router.delete('/checkout',UserMiddleware.checkUserLogin, CheckoutController.deleteCheckout);
router.get('/checkout-list',UserMiddleware.checkUserLogin, CheckoutController.getCheckoutListing);

router.put('/coupon',UserMiddleware.checkUserLogin, CouponController.applyCoupon )

module.exports = router;