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