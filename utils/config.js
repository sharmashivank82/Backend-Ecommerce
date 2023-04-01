const path = require( 'path' );

module.exports.getConfig = () => {
    const config = {
        'UPLOAD_PATH': path.resolve( `${__dirname }/../uploads` ),
        'JWT_SECRET': process.env.jwt_secret || 'R0MTR1NG',
        'JWT_EXPIRY_SECONDS' : 2592000,
    };

    return config;
};
