// Import files needed
const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals');
const request = require('supertest');
const { Item } = require('../models/index');
const app = require('../app');

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

//Testing for getting all items
describe('Get all items', () => {
    it('gets all users', async () => {
        const response = await request(app).get('/api/items');
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    })
})

// Testing for getting a single user
describe('get single item', () => {
    it('gets a single user', async () => {
        const response = await request(app).get('/api/items/:id');
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe('Dunkin Donut')
    })
})

/**
 * Testing get router and endpoint
 * 
 * Import files needed
 * -require jestglobals
 * -require supertest(mpm install supertest)
 * -require item model
 * -require app
 * Define item variable in global scope
 * Testing for getting all items
 * -describe('get all items', () => {
 * test('get all items', async() => {
 *  const response = await request(app).get('/endpoint')
 *  expect(response.body).toBe()
 * })
 * })
 * -describe('get single item')({
 * test('get one item', async() => {
 *  const response = await request(app).get('/endpoint')
 *  expect(respone.body).toBe()
 *  })
 * })
 */