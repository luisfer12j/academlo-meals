const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

const { globalErrorHandler } = require('./controllers/error.controller');

const { mealsRouter } = require('./routes/meals.route');
const { restaurantsRouter } = require('./routes/restaurants.route');
const { usersRouter } = require('./routes/users.route');
const { ordersRouter } = require('./routes/orders.route');

const app = express();
app.use(express.json());
app.use(cors());

// Add security headers
app.use(helmet());

// Compress responses
app.use(compression());

// Log incoming requests
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
else app.use(morgan('combined'));

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/restaurants', restaurantsRouter);
app.use('/api/v1/meals', mealsRouter);
app.use('/api/v1/orders', ordersRouter);

app.use('*', globalErrorHandler)
module.exports = { app }