const express = require('express');
//Controllers
const { createMeal, getAllMeals, getMealById, updateMeal, deleteMeal } = require('../controllers/meals.controller');
//Middlewares
const { validMealExist } = require('../middlewares/meals.middlewares');
const { protectToken, validRole } = require('../middlewares/users.middlewares');
const { mealValidations, errorValidations } = require('../middlewares/validations.middlewares');


const router = express.Router();

router.get('/', getAllMeals);
router.get('/:id', getMealById);

router.use(protectToken);
router.post('/:id', mealValidations, errorValidations, createMeal);
router.use(validRole);
router.route('/:id').patch(mealValidations, errorValidations, validMealExist, updateMeal).delete(validMealExist, deleteMeal);


module.exports = { mealsRouter: router }