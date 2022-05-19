const { Restaurant } = require('../models/restaurant.model');
const { Review } = require('../models/review.model');

const { catchAsync } = require('../utils/catchAsync');


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
    const { restaurant } = req;
    res.status(200).json({ status: 'success', restaurant });
})

const updateRestaurant = catchAsync(async (req, res, next) => {
    const { name, address } = req.body;
    const { restaurant } = req;
    await restaurant.update({ name, address });
    await restaurant.save();
    res.status(200).json({ status: 'success', restaurant });
})

const deleteRestaurant = catchAsync(async (req, res, next) => {
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