const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db.js');

const Item = sequelize.define('item',{
    title: DataTypes.STRING,
    price: DataTypes.FLOAT,
    description: DataTypes.STRING,
    category: DataTypes.STRING,
    image: DataTypes.STRING
})

module.exports = {
    db: sequelize,
    Item
}