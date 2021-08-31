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
    drink_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    is_vegan: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    },
    size: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    is_steamed: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    }
},
    {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'drink',
    }
)

module.exports = Drink;