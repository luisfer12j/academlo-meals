const { AppError } = require('../utils/appError');
const { Order } = require('../models/order.model');
const { Meal } = require('../models/meal.model');
const { Restaurant } = require('../models/restaurant.model');

const { catchAsync } = require('../utils/catchAsync');


const createOrder = catchAsync(async (req, res, next) => {
    const { quantity, mealId } = req.body;
    const { sesionUser, meal } = req;
    const price = (meal.price * quantity);
    const order = await Order.create({ quantity, mealId, userId: sesionUser.id, price });
    res.status(200).json({ status: 'success', order });
})

const getMyOrders = catchAsync(async (req, res, next) => {
    const { sesionUser } = req;
    const orders = await Order.findAll({ where: { userId: sesionUser.id }, include: [{ model: Meal, include: [{ model: Restaurant }] }] });
    res.status(200).json({ status: 'success', orders });
})

const updateMyOrder = catchAsync(async (req, res, next) => {
    const { order } = req;
    await order.update({ status: 'completed' });
    await order.save();
    res.status(200).json({ status: 'success', message: 'Order completed' })
})

const deleteMyOrder = catchAsync(async (req, res, next) => {
    const { order } = req;
    await order.update({ status: 'cancelled' });
    await order.save();
    res.status(200).json({ status: 'success', message: 'Order cancelled' })
})

module.exports = { createOrder, getMyOrders, updateMyOrder, deleteMyOrder }