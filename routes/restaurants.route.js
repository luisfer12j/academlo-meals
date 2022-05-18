const express = require('express');
const { getAllRestaurants, createRestaurant, getRestaurantById, updateRestaurant, deleteRestaurant, createReview, updateReview, deleteReview } = require('../controllers/restaurants.controller');
const { validRestaurant, validUserId } = require('../middlewares/restaurants.middlewares');
const { protectToken, validRole } = require('../middlewares/users.midlewares');
const { createReviewValidations, createRestaurantValidations, errorValidations } = require('../middlewares/validations.middlewares');

const router = express.Router();

router.get('/', getAllRestaurants);
router.get('/:id', getRestaurantById);

router.use(protectToken);
router.post('/', createRestaurantValidations, errorValidations, createRestaurant);
router.route('/reviews/:id').post(createReviewValidations, errorValidations, createReview).patch(createReviewValidations, errorValidations, validRestaurant, validUserId, updateReview).delete(validRestaurant, validUserId, deleteReview);

router.use(validRole);
router.route('/:id').patch(validRestaurant, updateRestaurant).delete(validRestaurant, deleteRestaurant);




module.exports = { restaurantsRouter: router };