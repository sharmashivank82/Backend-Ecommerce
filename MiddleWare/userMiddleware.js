const jwt = require('jsonwebtoken');
const config = require('../utils/config').getConfig();
const User = require('../Models/user');

class UserMiddleware{

    async checkUserLogin(req, res, next){
        const authToken = req.headers.authorization;
        const token = authToken?.split(' ')[1];
        try{
            const payload = jwt.verify(token, config.JWT_SECRET);
            const isUser = await User.findOne({ email: payload.email });
            if(isUser.role === 'user'){
                req.user = isUser;
                next();
            }else{
                return res.status(422).json({ message: 'INVALID ACCESS' })
            }
        }catch(err){
            return res.status(422).json({ message: 'INVALID USER' })
        }
    }

}

module.exports = new UserMiddleware();