const Checkout = require('../../Models/checkout');

class CheckoutController{

    async getCheckoutListing(req, res, next){
        try{
            const response = await Checkout.find({ userId: req.user._id }).populate("productId");
            return res.status(200).json({ response })
        }catch(err){
            next(err);
        }
    }
    
    async createCheckout(req, res, next){
        try{
            const isExist = await Checkout.find({ userId: req.user._id, productId: req.body.productId });
            if(isExist.length !== 0) return res.status(422).json({ message: 'product is already in the cart' })

            const data = { userId: req.user._id, productId: req.body.productId }
            await Checkout(data).save();
            return res.status(200).json({ message: 'Product is Added in Cart' });

        }catch(err){
            next(err)
        }
    }

    async deleteCheckout(req, res, next){
        try{

            await Checkout.findByIdAndDelete({ _id: req.body._id, userId: req.user._id })
            return res.status(200).json({ message: 'Product is removed From Cart' });

        }catch(err){
            next(err)
        }
    }

}

module.exports = new CheckoutController();   