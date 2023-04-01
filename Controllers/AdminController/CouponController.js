const Coupon = require('../../Models/coupon');
const { paginationFilter } = require('../../utils/helpers');

class CouponController{

    async createCoupon(req, res, next){
        try{

            const { code, amount } = req.body;
            const isCouponExist = await Coupon.findOne({ code, isapplied: false });
            if(isCouponExist) return res.status(422).json({ message: 'coupon code is already created' });

            await Coupon({ code, amount }).save();

            return res.status(200).json({ message: 'Coupon is Created SuccessFully' })            

        }catch(err){
            next(err)
        }
    }

    async updateCoupon(req, res, next){
        try{

            if(req.body.code){
                const isCouponExist = await Coupon.findOne({ code: req.body.code, isapplied: false });
                if(isCouponExist && isCouponExist._id != req.body._id)
                    return res.status(422).json({ message: 'coupon code is already created' })
            }

            const data = await Coupon.findOneAndUpdate({ _id: req.body._id }, { ...req.body });
            return res.status(200).json({ message: 'Coupon is Updated SuccessFully', data });          

        }catch(err){
            next(err)
        }
    }

    async deleteCoupon(req, res, next){
        try{

            const data = await Coupon.findByIdAndDelete({ _id: req.body._id });
            return res.status(200).json({ message: 'Coupon is Deleted SuccessFully' });          

        }catch(err){
            next(err)
        }
    }

    async getCouponListing(req, res, next){
        try{
            const pageFilter = paginationFilter( req );
            const response = await Coupon.find({}).skip(pageFilter.offset).limit(pageFilter.pageSize).sort("-updatedAt");
            const totalProduct = await Coupon.countDocuments({});
            let data = {
                currentPage: pageFilter.pageNo,
                totalCount: totalProduct,
                products: response
            }
            return res.status(200).json({ data })

        }catch(err){
            next(err);
        }
    }

}

module.exports = new CouponController();   