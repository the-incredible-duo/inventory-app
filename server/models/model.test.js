const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals');
const { Item } = require('./index.js');
const { sequelize } = require('../db.js');

//Testing Models
/**
 * Define item variable in global scope
 * Make sure to wipe db before new tests
 * Clear db after tests
 * Test for:
 * -name
 * -description
 * -prices
 * -category
 * -image
 * Make sure to wipe db and create new item before new tests
 * beforeAll(async () => {
 *      await db.sync({force: true})
 *      item = await Item.create({
 *          name: ''
 *          description: ''
 *          prices: ''
 *          category: ''
 *          image: ''
 *  })
 * })
 * Clear db after tests
 * -- afterAll(async () => await db.sync({force: true}))
 */