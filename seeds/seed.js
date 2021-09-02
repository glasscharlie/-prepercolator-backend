const sequelize = require('../config/connection');
const { User, Ingredient, Type, Drink } = require('../models');

const userSeedData = require('./userSeedData.json');
const ingredientSeedData = require('./ingredientSeedData.json');
const typeSeedData = require('./typeSeedData.json');
const drinkSeedData = require('./drinkSeedData.json');

const seedDatabase = async () => {

    await sequelize.sync({ force: true });

    await User.bulkCreate(userSeedData)

    await Type.bulkCreate(typeSeedData);

    await Ingredient.bulkCreate(ingredientSeedData);

    await Drink.create(drinkSeedData);

    process.exit(0);
};

seedDatabase();