const express = require('express');
//Controllers
const { createOrder, getMyOrders, updateMyOrder, deleteMyOrder } = require('../controllers/orders.controller');
//Middlewares
const { validMealExist, validOrderStatus, validOrderId } = require('../middlewares/orders.middlewares');
const { protectToken } = require('../middlewares/users.middlewares')



const router = express.Router();

router.use(protectToken);
router.get('/me', getMyOrders);
router.post('/', validMealExist, createOrder);
router.route('/:id').patch(validOrderStatus, validOrderId, updateMyOrder).delete(validOrderStatus, validOrderId, deleteMyOrder);


module.exports = { ordersRouter: router }