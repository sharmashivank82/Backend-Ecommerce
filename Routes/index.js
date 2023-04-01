const authRoute = require('./authRoutes');
const adminRoute = require('./adminRoutes');
const userRoute = require('./userRoutes');

// const AdminMiddleware

async function RouteGateway(app) {

    try{

        app.use('/auth', authRoute);
        app.use('/admin', adminRoute);
        app.use('/user', userRoute);

    }catch(err){
        console.log(err)
    }

}

module.exports = RouteGateway;