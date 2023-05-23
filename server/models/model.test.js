// Import files needed
const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals');
const { Item } = require('./index.js');
const { sequelize } = require('../db.js');

// Define item variable in global scope
let item;
// Make sure to wipe db before new tests
beforeAll(async () => {
    await sequelize.sync({ force: true });
    item = await Item.create({
        title: 'Dunkin donut',
        price: 5,
        description: 'The famous donuts from Dunkin',
        category: 'food',
        image: 'imageUrl'
    })
})
// Clear db after tests
afterAll(async () => sequelize.sync({ force: true}));

//Test properties
describe('Test item model', () => {
    it('has title')
    it('has description')
    it('has price')
    it('has category')
    it('has image')
})
//Testing Models
/**
 * Import files needed
 * Define item variable in global scope
 * Make sure to wipe db before new tests
 * Clear db after tests
 * Test for:
 * -title
 * -description
 * -prices
 * -category
 * -image
 * Make sure to wipe db and create new item before new tests
 * beforeAll(async () => {
 *      await db.sync({force: true})
 *      item = await Item.create({
 *          title: ''
 *          description: ''
 *          prices: ''
 *          category: ''
 *          image: ''
 *  })
 * })
 * Clear db after tests
 * -- afterAll(async () => await db.sync({force: true}))
 */