const { Restaurant } = require('../models/restaurant.model');
const { Review } = require('../models/review.model');
const { AppError } = require('../utils/appError');

const { catchAsync } = require('../utils/catchAsync');


const validRestaurant = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const restaurant = await Restaurant.findOne({ where: { id, status: 'active' } });
    if (!restaurant) {
        return next(new AppError('Restaurant does not exist with given id', 404));
    }
    req.restaurant = restaurant;
    next();
})

const validUserId = catchAsync(async (req, res, next) => {
    const { sesionUser } = req;
    const { id } = req.params;

    const review = Review.findOne({ where: { restaurantId: id, userId: sesionUser.id, status: 'active' } })

    if (!review) {
        return (nex(new AppError('Review does not exist', 404)))
    }
    req.review = review;
    next();
})

module.exports = { validRestaurant, validUserId }