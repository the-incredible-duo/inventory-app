const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals');
const request = require('supertest');
const { Item } = require('../models/index');
const app = require('../app');
/**
 * Testing get router and endpoint
 * 
 * Import files needed
 * -require jestglobals
 * -require supertest(mpm install supertest)
 * -require item model
 * -require app
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