const sequelize = require('../config/connection');
const { User, Ingredient, Type } = require('../models');

const userSeedData = require('./userSeedData.json');
const ingredientSeedData = require('./ingredientSeedData.json');
const typeSeedData = require('./typeSeedData.json');

const seedDatabase = async () => {

    await sequelize.sync({ force: true });

    await User.bulkCreate(userSeedData);

    await Ingredient.bulkCreate(ingredientSeedData);

    await Type.bulkCreate(typeSeedData);

    process.exit(0);
};

seedDatabase();