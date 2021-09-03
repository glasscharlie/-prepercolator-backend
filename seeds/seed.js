const sequelize = require("../config/connection");
const { User, Ingredient, Type, Drink, Order } = require("../models");

const userSeedData = require("./userSeedData.json");
const ingredientSeedData = require("./ingredientSeedData.json");
const typeSeedData = require("./typeSeedData.json");
const drinkSeedData = require("./drinkSeedData.json");
const orderSeedData = require("./orderSeedData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userSeedData);

  await Type.bulkCreate(typeSeedData);

  await Ingredient.bulkCreate(ingredientSeedData);

  await Drink.create(drinkSeedData[0]).then(async (drink) => {
    ingredients = [1, 6, 19];
    ingredient_amount = [2, 2, 2];
    for (let i = 0; i < ingredients.length; i++) {
      await drink.addIngredient(ingredients[i], {
        through: { amount: ingredient_amount[i] },
      });
    }
  });
  await Drink.create(drinkSeedData[1]).then(async (drink) => {
    ingredients = [1, 6, 19];
    ingredient_amount = [4, 6, 2];
    for (let i = 0; i < ingredients.length; i++) {
      await drink.addIngredient(ingredients[i], {
        through: { amount: ingredient_amount[i] },
      });
    }
  });
  await Drink.create(drinkSeedData[2]).then(async (drink) => {
    ingredients = [2];
    ingredient_amount = [16];
    for (let i = 0; i < ingredients.length; i++) {
      await drink.addIngredient(ingredients[i], {
        through: { amount: ingredient_amount[i] },
      });
    }
  });
  await Drink.create(drinkSeedData[3]).then(async (drink) => {
    ingredients = [3, 6];
    ingredient_amount = [2, 8];
    for (let i = 0; i < ingredients.length; i++) {
      await drink.addIngredient(ingredients[i], {
        through: { amount: ingredient_amount[i] },
      });
    }
  });
  await Drink.create(drinkSeedData[4]).then(async (drink) => {
    ingredients = [1, 6];
    ingredient_amount = [2, 8];
    for (let i = 0; i < ingredients.length; i++) {
      await drink.addIngredient(ingredients[i], {
        through: { amount: ingredient_amount[i] },
      });
    }
  });
  await Drink.create(drinkSeedData[5]).then(async (drink) => {
    ingredients = [1, 6, 12, 13];
    ingredient_amount = [2, 8, 2, 2];
    for (let i = 0; i < ingredients.length; i++) {
      await drink.addIngredient(ingredients[i], {
        through: { amount: ingredient_amount[i] },
      });
    }
  });
  await Drink.create(drinkSeedData[6]).then(async (drink) => {
    ingredients = [1, 10];
    ingredient_amount = [2, 8];
    for (let i = 0; i < ingredients.length; i++) {
      await drink.addIngredient(ingredients[i], {
        through: { amount: ingredient_amount[i] },
      });
    }
  });
  await Drink.create(drinkSeedData[7]).then(async (drink) => {
    ingredients = [1, 11];
    ingredient_amount = [2, 10];
    for (let i = 0; i < ingredients.length; i++) {
      await drink.addIngredient(ingredients[i], {
        through: { amount: ingredient_amount[i] },
      });
    }
  });
  await Drink.create(drinkSeedData[8]).then(async (drink) => {
    ingredients = [1, 9, 12];
    ingredient_amount = [3, 8, 2];
    for (let i = 0; i < ingredients.length; i++) {
      await drink.addIngredient(ingredients[i], {
        through: { amount: ingredient_amount[i] },
      });
    }
  });
  await Drink.create(drinkSeedData[8]).then(async (drink) => {
    ingredients = [1, 21];
    ingredient_amount = [2, 1];
    for (let i = 0; i < ingredients.length; i++) {
      await drink.addIngredient(ingredients[i], {
        through: { amount: ingredient_amount[i] },
      });
    }
  });

  await Order.create(orderSeedData).then(async (order) => {
    drinks = [1, 2, 2];
    for (let i = 0; i < drinks.length; i++) {
      await order.addDrinks(drinks[i]);
    }
  });

  process.exit(0);
};

seedDatabase();
