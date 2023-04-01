module.exports.paginationFilter = ( req ) => {

    let pageNo = 1, pageSize = 10 ;

    if ( typeof req.query.page !== 'undefined' && req.query.page > 0 ) {
        pageNo = parseInt( req.query.page );
    }

    if ( typeof req.query.limit !== 'undefined' && req.query.limit > 0 && req.query.limit < 1000 ) {
        pageSize = parseInt( req.query.limit );
    }

    const offset = ( pageNo - 1 ) * pageSize; // how many elements we have to skip them

    return { 'pageNo': pageNo, 'pageSize': pageSize, 'offset': offset };
};