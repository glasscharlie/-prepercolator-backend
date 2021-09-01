const express = require('express');
const router = express.Router();

const userRoutes = require("./userRoutes");
const drinkRoutes = require("./drinkRoutes");
const ingredientRoutes=require("./ingredientRoutes")
const typeRoutes = require("./typeRoutes");
const orderRoutes = require("./orderRoutes");


router.use("/users",userRoutes);
router.use("/drinks",drinkRoutes);
router.use("/ingredients",ingredientRoutes);
router.use("/type",typeRoutes);
router.use("/orders",orderRoutes);


module.exports = router;