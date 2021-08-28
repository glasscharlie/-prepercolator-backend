const { Model, DataTypes } = require('sequelize');
const sequelize = require ('../config/connection');


class Drink extends Model{}

Drink.init(
    { 
    id: { 
            type: DataTypes.INTEGER, 
            allowNull: false, 
            primaryKey: true,
            autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rating: {
        type: DataTypes.INTEGER, 
        allowNull: true, 
    },
    is_vegan: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    },
    unit_amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    is_steamed: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    }
},
    {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Drink',
    }
)

module.exports = Drink;