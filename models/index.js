const User = require('./User');
const Drink = require('./Drink');
const Ingredient = require ('./Ingredient');
const Type = require ('./Type');


User.hasMany(Drink);
Drink.belongsTo(User);

Type.hasMany(Ingredient);
Ingredient.belongsTo(Type)


const drinkIngredients = sequelize.define('drinkIngredients', {
    ammount: DataTypes.INTEGER
  });

Ingredient.belongsToMany(Drink, { through: 'drinkIngredients'});
Drink.belongsToMany(Ingredient,{ through: 'drinkIngredients'})


module.exports = { User, Drink, Ingredient, Type }
