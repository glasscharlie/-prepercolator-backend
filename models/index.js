const User = require('./User');
const Drink = require('./Drink');
const Ingredient = require ('./Ingredient');


User.hasMany(Drink,{
    foreignKey: 'user_id',
});

Drink.hasMany(User,{
    foreignKey: 'user_id',
});


module.exports = { User, Drink, Ingredient }