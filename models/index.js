const sequelize = require('../config/connection.js');
var DataTypes = require('sequelize/lib/data-types');
const User = require('./User');
const Drink = require('./Drink');
const Ingredient = require ('./Ingredient');
const Type = require ('./Type');


User.hasMany(Drink);
Drink.belongsTo(User);

Type.hasMany(Ingredient);
Ingredient.belongsTo(Type)


const drinkIngredients = sequelize.define('drinkIngredients', {
    amount: {type:DataTypes.INTEGER, allowNull: false}
  })

Ingredient.belongsToMany(Drink, { through: 'drinkIngredients'});
Drink.belongsToMany(Ingredient,{ through: 'drinkIngredients'})


module.exports = { User, Drink, Ingredient, Type }


