const express = require('express');
const router = express.Router();

const CheckoutController = require('../Controllers/UserController/CheckoutController');
const UserMiddleware = require('../MiddleWare/userMiddleware')

router.post('/checkout',UserMiddleware.checkUserLogin, CheckoutController.createCheckout);
router.delete('/checkout',UserMiddleware.checkUserLogin, CheckoutController.deleteCheckout);
router.get('/checkout-list',UserMiddleware.checkUserLogin, CheckoutController.getCheckoutListing);

module.exports = router;