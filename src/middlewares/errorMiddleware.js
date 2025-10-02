

function errorHandler(err, req, res, next) {

    console.log(`\n\n\n ----------${JSON.stringify(err)}----------\n\n\n`);

    let status = err.status || 500, message = err.message || 'Something wrong', type = err.type || 'Unknown error';
    res.status(status).json({ status: 'error', message: message, type: type });

}

module.exports = errorHandler;