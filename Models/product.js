const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    name: { type: String, required: true }, 
    image: { type: String, required: true }, 
    price: { type: String, required: true }, 

}, { timestamps: true })

const product = mongoose.model.product || mongoose.model('product', productSchema);
module.exports = product;