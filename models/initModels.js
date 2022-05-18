const { Meal } = require('./meal.model');
const { Order } = require('./order.model');
const { Restaurant } = require('./restaurant.model');
const { Review } = require('./review.model');
const { User } = require('./user.model');



const initModels = () => {
    //----------------//
    //Models relations//
    //----------------//
    //Restaurant <--> Meal
    Restaurant.hasMany(Meal);
    Meal.belongsTo(Restaurant);
    //Order <--> Meal
    Order.hasOne(Meal);
    Meal.belongsTo(Order);
    //User <--> Order
    User.hasOne(Order);
    Order.belongsTo(User);
    //User <--> Review
    User.hasMany(Review);
    Review.belongsTo(User);
    //Restaurant <--> Review
    Restaurant.hasMany(Review);
    Review.belongsTo(Restaurant);
}

module.exports = { initModels };