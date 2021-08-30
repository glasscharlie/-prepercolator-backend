const User = require('./User');
const Drink = require('./Drink');
const Ingredient = require ('./Ingredient');
const Type = require ('./Type');


User.hasMany(Drink);
Drink.belongsTo(User);

Ingredient.hasOne(Type);

Drink.hasMany(Ingredient);

module.exports = { User, Drink, Ingredient, Type }