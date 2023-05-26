const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require('../db.js');

const Item = sequelize.define("item", {
  title: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.FLOAT,
  },
  description: {
    type: DataTypes.STRING,
  },
  category: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
  },
});

module.exports = {
    Item
}