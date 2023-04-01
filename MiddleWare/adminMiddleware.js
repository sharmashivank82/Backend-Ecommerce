const jwt = require('jsonwebtoken');
const config = require('../utils/config').getConfig();
const User = require('../Models/user');
const multer = require('multer')

class AdminMiddleware{

    async checkAdminLogin(req, res, next){
        const authToken = req.headers.authorization;
        const token = authToken?.split(' ')[1];
        try{
            const payload = jwt.verify(token, config.JWT_SECRET);
            console.log({ payload })
            const isAdmin = await User.findOne({ email: payload.email });
            if(isAdmin.role === 'admin'){
                next();
            }else{
                return res.status(422).json({ message: 'INVALID ACCESS' })
            }
        }catch(err){
            return res.status(422).json({ message: 'INVALID USER' })
        }
    }

    storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, config.UPLOAD_PATH)
        },
        filename: function (req, file, cb) {
            console.log({ file })
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
          cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
        }
    })


    upload = multer({ storage: this.storage })

}

module.exports = new AdminMiddleware();