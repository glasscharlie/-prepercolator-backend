const sequelize = require('../config/connection');
const { User, Ingredient, Type, Drink, Order } = require('../models');

const userSeedData = require('./userSeedData.json');
const ingredientSeedData = require('./ingredientSeedData.json');
const typeSeedData = require('./typeSeedData.json');
const drinkSeedData = require('./drinkSeedData.json');
const orderSeedData = require('./orderSeedData.json');

const seedDatabase = async () => {

    await sequelize.sync({ force: true });

    await User.bulkCreate(userSeedData)

    await Type.bulkCreate(typeSeedData);

    await Ingredient.bulkCreate(ingredientSeedData);

    await Drink.create(drinkSeedData[0]).then(async drink => {
        ingredients = [1,2,12]
        ingredient_amount = [5,3,1]
        for (let i = 0; i < ingredients.length; i++) {
            await drink.addIngredient(ingredients[i], { through: { amount:ingredient_amount[i]} } )            
        }
    });

    await Drink.create(drinkSeedData[1])

    await Order.create(orderSeedData).then(async order => {
        drinks = [1,2,2]
        for (let i = 0; i < drinks.length; i++) {
            await order.addDrinks(drinks[i])            
        }
    });

    process.exit(0);
};

seedDatabase();