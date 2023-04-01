const mongoose = require('mongoose');

function established_database_connection(app, port){

    mongoose.set("strictQuery", false);

    mongoose.connect(process.env.db_url).then((result) => {
        console.clear();
        console.log('Connected to Database')
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        })
    }).catch(err => {
        console.log('MongoDb Error Connection ERROR :: ', err);
    })
    
}

module.exports = established_database_connection;
