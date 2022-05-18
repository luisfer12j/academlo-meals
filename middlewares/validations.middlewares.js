const { body, validationResult } = require('express-validator');

const createUserValidations = [
    body('username').notEmpty().withMessage('Username cannot be empty'),
    body('email').notEmpty().withMessage('Email cannot be empty').isEmail().withMessage('Must be a valid email'),
    body('password').notEmpty().withMessage('Password cannot be empty').isLength({ min: 8 }).withMessage('Password must be a least 8 charect'),
]

const createRestaurantValidations = [
    body('name').notEmpty().withMessage('Name cannot be empty'),
    body('address').notEmpty().withMessage('Address cannot be empty'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rate between 1 - 5').notEmpty().withMessage('Rating cannot be empty')
]

const createReviewValidations = [
    body('comment').notEmpty().withMessage('Comment cannot be empty'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rate between 1 - 5').notEmpty().withMessage('Rating cannot be empty')
]

const mealValidations = [
    body('name').notEmpty().withMessage('Name cannot be empty'),
    body('price').notEmpty().withMessage('Price cannot be empty')
]


const errorValidations = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const messages = errors.array().map(error => error.msg)
        const errorMsg = messages.join('. ');
        return res.status(400).json({ status: 'error', message: errorMsg });
    }
    next();
}

module.exports = { createUserValidations, errorValidations, createRestaurantValidations, createReviewValidations, mealValidations }