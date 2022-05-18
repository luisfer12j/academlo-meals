const { Meal } = require('../models/meal.model');
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');
const { Restaurant } = require('../models/restaurant.model');
const { Order } = require('../models/order.model');



const validMealExist = catchAsync(async (req, res, next) => {
    const { mealId } = req.body;
    const meal = await Meal.findOne({ where: { id: mealId, status: 'active' }, include: [{ model: Restaurant }] });
    if (!meal) {
        return next(new AppError('Meal does not exist with given id', 404));
    }
    req.meal = meal;
    next();
});

const validOrderStatus = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const order = await Order.findOne({ where: { id, status: 'active' } });
    if (!order) {
        return next(new AppError('Order does not found with given id', 404));
    }
    req.order = order;
    next();
})

const validOrderId = catchAsync(async (req, res, next) => {
    const { order, sesionUser } = req;
    if (sesionUser.id !== order.userId) {
        return next(new AppError('Access denied', 403));
    }
    next();
})

module.exports = { validMealExist, validOrderStatus, validOrderId }