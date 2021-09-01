const sequelize = require('../config/connection.js');
var DataTypes = require('sequelize/lib/data-types');
const User = require('./User');
const Drink = require('./Drink');
const Ingredient = require ('./Ingredient');
const Type = require ('./Type');
const Order = require ('./Order');


User.hasMany(Drink);
Drink.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

Type.hasMany(Ingredient);
Ingredient.belongsTo(Type)

Order.belongsToMany(Drink, { through: 'drinkOrder'});
Drink.belongsToMany(Order,{ through: 'drinkOrder'})

const drinkIngredients = sequelize.define('drinkIngredients', {
    amount: {type:DataTypes.INTEGER, allowNull: false}
  })

Ingredient.belongsToMany(Drink, { through: 'drinkIngredients'});
Drink.belongsToMany(Ingredient,{ through: 'drinkIngredients'})


module.exports = { User, Drink, Ingredient, Type, Order }


