const { Meal } = require('../models/meal.model');
const { AppError } = require('../utils/appError');
const { Restaurant } = require('../models/restaurant.model');

const { catchAsync } = require('../utils/catchAsync');


const getAllMeals = catchAsync(async (req, res, next) => {
    const meals = await Meal.findAll({ where: { status: 'active' }, include: [{ model: Restaurant }] });
    res.status(200).json({ meals })
})

const getMealById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const meal = await Meal.findOne({ where: { id, status: 'active' }, include: [{ model: Restaurant }] });
    if (!meal) {
        return next(new AppError('Cannot find meal with given id'), 404);
    }
    res.status(200).json({ status: 'success', meal })
});

const createMeal = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { name, price } = req.body;
    const meal = await Meal.create({ name, price, restaurantId: id });
    res.status(200).json({ status: 'success', meal })
})

const updateMeal = catchAsync(async (req, res, next) => {
    const { meal } = req;
    const { name, price } = req.body;
    await meal.update({ name, price });
    await meal.save();
    res.status(200).json({ status: 'success', meal });
})

const deleteMeal = catchAsync(async (req, res, next) => {
    const { meal } = req;
    await meal.update({ status: 'disable' });
    await meal.save();
    res.status(200).json({ status: 'success' });
});

module.exports = { createMeal, getAllMeals, getMealById, updateMeal, deleteMeal };