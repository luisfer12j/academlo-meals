const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { AppError } = require('../utils/appError');
const { User } = require('../models/user.model');
const { Order } = require('../models/order.model');
const { Restaurant } = require('../models/restaurant.model');
const { Meal } = require('../models/meal.model');

const { catchAsync } = require('../utils/catchAsync');


dotenv.config({ path: './config.env' });


const getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    res.status(200).json({ users })
});

const createUser = catchAsync(async (req, res, next) => {
    const { username, email, password, role } = req.body;

    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt)

    const newUser = await User.create({ name: username, email, password: hashPassword, role });
    newUser.password = undefined;
    res.status(201).json({ status: 'success', newUser });
});

const updateUser = catchAsync(async (req, res, next) => {
    const { username, email } = req.body;
    const { user } = req;
    await user.update({ name: username, email })
    await user.save();
    res.status(201).json({ status: 'success', user })
});

const deleteUser = catchAsync(async (req, res, next) => {
    const { user } = req;
    await user.update({ status: 'disable' });
    await user.save();
    res.status(201).json({ status: 'success' });
})

const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email, status: 'active' } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return next(new AppError('Invalid credential', 400));
    }
    user.password = undefined;
    const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    res.status(200).json({ status: 'success', user, token });
})

const getAllOrders = catchAsync(async (req, res, next) => {
    const { sesionUser } = req;
    const orders = await Order.findAll({ where: { userId: sesionUser.id }, include: [{ model: Meal, include: [{ model: Restaurant }] }] });
    if (!orders) {
        return next(new AppError('Orders not found', 404));
    }
    res.status(200).json({ status: 'Success', orders })
});

const getOrderById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { sesionUser } = req;
    const order = await Order.findOne({ where: { id, userId: sesionUser.id }, include: [{ model: Meal, include: [{ model: Restaurant }] }] })

    if (!order) {
        return next(new AppError('Order not found', 404));
    }
    res.status(200).json({ status: 'Success', order })
});

module.exports = { getAllUsers, createUser, updateUser, deleteUser, login, getAllOrders, getOrderById };