const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');
const { Meal } = require('../models/meal.model');
const { Restaurant } = require('../models/restaurant.model');

const validMealExist = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const meal = await Meal.findOne({ where: { id, status: 'active' }, include: [{ model: Restaurant }] });
    if (!meal) {
        return next(new AppError('Meal does not exist with given id', 404));
    }
    req.meal = meal;
    next();
});

module.exports = { validMealExist }