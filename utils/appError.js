class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        //4** -> client (error) || 5** -> server (fail)\\
        this.status = `${statusCode}`.startsWith('4') ? 'error' : 'fail';
        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = { AppError };