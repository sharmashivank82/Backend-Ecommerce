const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({

    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }

}, { timestamps: true })

const checkout = mongoose.model.checkout || mongoose.model('checkout', checkoutSchema);
module.exports = checkout;