const jwt = require('jsonwebtoken');

const { User } = require('../models/user.model');
const { AppError } = require('../utils/appError');

const { catchAsync } = require('../utils/catchAsync');


const protectToken = catchAsync(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next(new AppError('Session invalid', 403));
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { id: decoded.id }, status: 'availible' });
    if (!user) {
        return next(new AppError('This account is not availible', 403));
    }
    req.sesionUser = user;
    next();
});

const validUserExist = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } })
    if (!user) {
        return next(new AppError('User does not exist with given id', 404))
    }
    if (user.status === 'active') {
        req.user = user;
        next();
    } else {
        return next(new AppError('User does not availible', 404))
    }
})

const validUserId = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const { sesionUser } = req;

    if (sesionUser.id !== parseInt(id)) {
        return (next(new AppError('Access denied', 403)));
    }
    next();
})

const validRole = catchAsync(async (req, res, next) => {
    const { sesionUser } = req;
    if (sesionUser.role !== 'admin') {
        return next(new AppError('Access denied', 403));
    }
    next();
})

module.exports = { protectToken, validUserExist, validUserId, validRole }

