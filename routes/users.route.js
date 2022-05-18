const express = require('express');
const { getAllUsers, createUser, updateUser, deleteUser, login, getAllOrders, getOrderById } = require('../controllers/users.controller');
const { protectToken, validUserId, validUserExist } = require('../middlewares/users.midlewares');
const { createUserValidations, errorValidations } = require('../middlewares/validations.middlewares');


const router = express.Router();


router.post('/signup', createUserValidations, errorValidations, createUser);
router.post('/login', login);

//Valid token
router.use(protectToken);

router.get('/', getAllUsers);
router.route('/:id').patch(validUserId, validUserExist, updateUser).delete(validUserId, validUserExist, deleteUser);
router.get('/orders', getAllOrders);
router.get('/orders/:id', getOrderById);


module.exports = { usersRouter: router };