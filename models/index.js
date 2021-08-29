const User = require('./User');
const Drink = require('./Drink');
const Ingredient = require ('./Ingredient');
const Type = require ('./Type');


User.hasMany(Drink,{
    foreignKey: 'drink_id',
});

Drink.belongsToMany(User,{
    through: 'user_id',
});

Ingredient.hasOne(Type, {
    foreignKey: 'ingredient_type'
});

module.exports = { User, Drink, Ingredient, Type }