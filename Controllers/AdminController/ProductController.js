const Product = require('../../Models/product');
const { paginationFilter } = require('../../utils/helpers');

class ProductController{

    async getProductListing(req, res, next){
        try{
            const pageFilter = paginationFilter( req );
            const response = await Product.find({}).skip(pageFilter.offset).limit(pageFilter.pageSize).sort("-updatedAt");
            const totalProduct = await Product.countDocuments({});
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
    
    async createProduct(req, res, next){
        try{

            await Product(req.body).save();
            return res.status(200).json({ message: 'Product is created SuccessFully' });

        }catch(err){
            next(err)
        }
    }

    async updateProduct(req, res, next){
        try{

            await Product.findOneAndUpdate({ _id: req.body._id }, { ...req.body });
            return res.status(200).json({ message: 'Product is updated SuccessFully' });

        }catch(err){
            next(err)
        }
    }

    async deleteProduct(req, res, next){
        try{

            await Product.findByIdAndDelete({ _id: req.body._id })
            return res.status(200).json({ message: 'Product is deleted SuccessFully' });

        }catch(err){
            next(err)
        }
    }

    async uploaditem(req, res, next){
        console.log( 'req.file is ', req.file );

        // for Linux
        // req.file.path = req.file.path.split( "/uploads/" )[ 1 ];

        // for windows
        req.file['path'] = req.file?.path?.split( "uploads\\" )[ 1 ];

        return res.status(200).json({ media: req.file })
    }

}

module.exports = new ProductController();   