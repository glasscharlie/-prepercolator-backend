const User = require('./User');
const Drink = require('./Drink');
const Ingredient = require ('./Ingredient');


User.hasMany(Drink,{
    foreignKey: 'drink_id',
});

Drink.belongsTo(User,{
    through: 'user_id',
});


module.exports = { User, Drink, Ingredient }