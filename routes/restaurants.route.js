const express = require('express');
//Controllers
const { getAllRestaurants, createRestaurant, getRestaurantById, updateRestaurant, deleteRestaurant, createReview, updateReview, deleteReview } = require('../controllers/restaurants.controller');
//Middlewares
const { validRestaurant, validUserId } = require('../middlewares/restaurants.middlewares');
const { protectToken, validRole } = require('../middlewares/users.middlewares');
const { createReviewValidations, createRestaurantValidations, errorValidations } = require('../middlewares/validations.middlewares');

const router = express.Router();

router.get('/', getAllRestaurants);
router.get('/:id', validRestaurant, getRestaurantById);

router.use(protectToken);
router.post('/', createRestaurantValidations, errorValidations, createRestaurant);
router.route('/reviews/:id').post(createReviewValidations, errorValidations, createReview).patch(createReviewValidations, errorValidations, validRestaurant, validUserId, updateReview).delete(validRestaurant, validUserId, deleteReview);

router.use(validRole);
router.route('/:id').patch(validRestaurant, updateRestaurant).delete(validRestaurant, deleteRestaurant);




module.exports = { restaurantsRouter: router };