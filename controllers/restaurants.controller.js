const { AppError } = require('../utils/appError');
const { Restaurant } = require('../models/restaurant.model');
const { Review } = require('../models/review.model');

const { catchAsync } = require('../utils/catchAsync');
const res = require('express/lib/response');


const getAllRestaurants = catchAsync(async (req, res, next) => {
    const restaurants = await Restaurant.findAll({ where: { status: 'active' }, include: [{ model: Review }] });

    res.status(200).json({ status: 'success', restaurants })
})

const createRestaurant = catchAsync(async (req, res, next) => {
    const { name, address, rating } = req.body;

    const restaurant = await Restaurant.create({ name, address, rating });
    res.status(200).json({ status: 'success', restaurant });
});

const getRestaurantById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const restaurant = await Restaurant.findOne({ where: { id }, include: [{ model: Review }] });
    if (restaurant.status !== 'active') {
        return next(new AppError('this restaurant is not available', 403));
    }
    res.status(200).json({ status: 'success', restaurant });
})

const updateRestaurant = catchAsync(async (req, res, next) => {
    const { name, address } = req.body;
    const { restaurant } = req;
    // const { id } = req.params;
    // const restaurantEdited = await Restaurant.findOne({ where: { id, status: 'active' } });
    // if (!restaurantEdited) {
    //     return next(new AppError('Rstaurant does not exist with given id', 404));
    // }
    await restaurant.update({ name, address });
    await restaurant.save();
    res.status(200).json({ status: 'success', restaurant });
})

const deleteRestaurant = catchAsync(async (req, res, next) => {
    // const { id } = req.params;
    // const restaurant = await Restaurant.findOne({ where: { id, status: 'active' } });
    // if (!restaurant) {
    //     return next(new AppError('Rstaurant does not exist with given id', 404));
    // }
    const { restaurant } = req
    await restaurant.update({ status: 'disable' });
    await restaurant.save();
    res.status(200).json({ status: 'success' });
});

const createReview = catchAsync(async (req, res, next) => {
    const { comment, rating } = req.body;
    const { id } = req.params;
    const { sesionUser } = req
    const review = await Review.create({ comment, rating, userId: sesionUser.id, restaurantId: id })

    res.status(200).json({ status: 'success', review });
});

const updateReview = catchAsync(async (req, res, next) => {
    const { review } = req;
    const { comment, rating } = req.body;
    await review.update({ comment, rating });
    await review.save();
    res.status(200).json({ status: 'success', review });
})

const deleteReview = catchAsync(async (req, res, next) => {
    const { review } = req;
    await review.update({ status: 'disabled' });
    await review.save();
    res.status(200).json({ status: 'success' });
})

module.exports = { getAllRestaurants, createRestaurant, getRestaurantById, updateRestaurant, deleteRestaurant, createReview, updateReview, deleteReview };