const User = require('./User');
const Drink = require('./Drink');
const Ingredient = require ('./Ingredient');
const Type = require ('./Type');


User.hasMany(Drink);
Drink.belongsTo(User);

Type.hasMany(Ingredient);
Ingredient.belongsTo(Type)

Ingredient.hasMany(Drink);
Drink.belongsTo(Ingredient)


module.exports = { User, Drink, Ingredient, Type }
