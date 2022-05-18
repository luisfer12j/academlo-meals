const express = require('express');
const { globalErrorHandler } = require('./controllers/error.controller');

const { mealsRouter } = require('./routes/meals.route');
const { restaurantsRouter } = require('./routes/restaurants.route');
const { usersRouter } = require('./routes/users.route');
const { ordersRouter } = require('./routes/orders.route');

const app = express();
app.use(express.json());

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/restaurants', restaurantsRouter);
app.use('/api/v1/meals', mealsRouter);
app.use('/api/v1/orders', ordersRouter);

app.use('*', globalErrorHandler)
module.exports = { app }