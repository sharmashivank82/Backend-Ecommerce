const express = require('express')
const router = express.Router();

const ProductController = require('../Controllers/AdminController/ProductController');
const CouponController = require('../Controllers/AdminController/CouponController');

const AdminMiddleware = require('../MiddleWare/adminMiddleware');

router.post('/product',AdminMiddleware.checkAdminLogin, ProductController.createProduct);
router.put('/product',AdminMiddleware.checkAdminLogin, ProductController.updateProduct);
router.delete('/product',AdminMiddleware.checkAdminLogin, ProductController.deleteProduct);
router.get('/product-list',AdminMiddleware.checkAdminLogin, ProductController.getProductListing);

router.post('/coupon',AdminMiddleware.checkAdminLogin, CouponController.createCoupon);
router.put('/coupon',AdminMiddleware.checkAdminLogin, CouponController.updateCoupon);
router.delete('/coupon',AdminMiddleware.checkAdminLogin, CouponController.deleteCoupon);
router.get('/coupon-list',AdminMiddleware.checkAdminLogin, CouponController.getCouponListing);


router.post('/uploads', [ AdminMiddleware.checkAdminLogin, AdminMiddleware.upload.single('file') ], ProductController.uploaditem );

module.exports = router;