const {Sequelize} = require('sequelize')
const {sequelize} = require('../db')

const Item = sequelize.define("Item", {
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  prices: Sequelize.INTEGER,
  category: Sequelize.STRING,
  image: Sequelize.STRING,
});
sequelize.sync();

module.exports = {
  db: sequelize,
  Item,
};
