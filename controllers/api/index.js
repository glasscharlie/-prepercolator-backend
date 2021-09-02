const express = require('express');
const router = express.Router();

//import the routes
const userRoutes = require("./userRoutes");
const drinkRoutes = require("./drinkRoutes");
const ingredientRoutes=require("./ingredientRoutes")
const typeRoutes = require("./typeRoutes");
const orderRoutes = require("./orderRoutes");

//use the routes
router.use("/users",userRoutes);
router.use("/drinks",drinkRoutes);
router.use("/ingredients",ingredientRoutes);
router.use("/type",typeRoutes);
router.use("/orders",orderRoutes);


module.exports = router;