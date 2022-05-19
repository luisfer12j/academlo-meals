const express = require('express');
//Controllers
const { getAllUsers, createUser, updateUser, deleteUser, login, getAllOrders, getOrderById } = require('../controllers/users.controller');
//Middlewares
const { protectToken, validUserId, validUserExist } = require('../middlewares/users.middlewares');
const { createUserValidations, errorValidations } = require('../middlewares/validations.middlewares');


const router = express.Router();


router.post('/signup', createUserValidations, errorValidations, createUser);
router.post('/login', login);

router.use(protectToken);

router.get('/', getAllUsers);
router.route('/:id').patch(validUserId, validUserExist, updateUser).delete(validUserId, validUserExist, deleteUser);
router.get('/orders', getAllOrders);
router.get('/orders/:id', getOrderById);


module.exports = { usersRouter: router };