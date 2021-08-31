const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Ingredient extends Model {}

Ingredient.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        ingredient_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tier: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_vegan: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
        },
        price_per_unit: {
            type: DataTypes.FLOAT,
            allowNull: false,
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'ingredient'
    }
);

module.exports = Ingredient;