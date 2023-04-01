const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({

    code: { type: String, required: true }, 
    amount: { type: String, required: true }, 
    isapplied: { type: Boolean, default: false }, 

}, { timestamps: true })

const coupon = mongoose.model.coupon || mongoose.model('coupon', couponSchema);
module.exports = coupon;