const User = require('../../Models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../utils/config').getConfig();

class AuthController{

     // 30days

    async register(req, res, next){
        try{

            const { name, email, password } = req.body;

            const isEmailExist = await User.findOne({ email });
            if(isEmailExist) return res.status(400).json({ message: 'Email is already registered' });

            const hashpwd = await bcrypt.hash(password, 10);
            const data = { name, email, password: hashpwd };
            await User(data).save();

            return res.status(200).json({ message: 'user is created successfully' })

        }catch(err){
            next(err)
        }
    }

    async login(req, res, next){
        try{

            const { email, password } = req.body;
            const isEmailExist = await User.findOne({ email });
            if(isEmailExist){
                const ispwdmatch = await bcrypt.compare(password, isEmailExist.password);
                if(ispwdmatch){
                    let token = await jwt.sign({
                        '_id': isEmailExist.name,
                        'email': isEmailExist.email
                    }, config.JWT_SECRET, {
                        'algorithm': 'HS256',
                        'expiresIn': config.JWT_EXPIRY_SECONDS,
                    })

                    return res.status(200).json({ token, message: 'Login SuccessFully', _id: isEmailExist._id.toString() })
                }
            }

            return res.status(422).json({ message: 'Invalid Credentials' })

        }catch(err){
            next(err)
        }
    }

    async checkToken(req, res, next){
        try{
            const authToken = req.headers.authorization;
            const token = authToken?.split(' ')[1];
            var payload;
            try{
                payload = jwt.verify(token, config.JWT_SECRET);
            }catch(err){
                return res.status(422).json({ message: 'INvalid Token' })
            }
            const isUser = await User.findOne({ email: payload.email }).select("-password");
            if(isUser) return res.status(200).json({ user: isUser })
            return res.status(422).json({ message: 'INvalid Token' })
        }catch(err){
            next(err)
        }
    }

}

module.exports = new AuthController();