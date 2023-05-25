const express = require('express');
const router = express.Router();
const { Item } = require('../models/index.js');
const { sequelize } = require('../db.js');
const app = require("../app.js");

router.get('/', async(req, res, next) => {
    try{
        const items = await Item.findAll();
        res.send(items);
    }catch(error){
        next(error);
    }
})

router.get('/:id', async(req, res, next) => {
    try{
        const { id } = req.params;
        const item = await Item.findByPk(id);
        res.json(item);
    }catch(error){
        next(error);
    }
})

router.put("/:id", async (req, res, next) => {    // Express Route to UPDATE the Item
    const { id } = req.params;  // Contains the properties mapped to id
    const{ name, image } = req.body;    // Allows access of data from the client side
  
    try {
      const items = await Item.findByPk(id);   // Finds the item through the given id
  
      if (!items) {
        res.status(404).send("Item not found");
      } else {
        await items.update({name, image});    // Update items with name and image values
        res.send(items);
      }
    } catch (error) {
      next(error);
    }
  });

  // Routes for Tier II
  router.post('/items', async (req, res) => {
    const { name, description, price, category, image } = req.body;
    try {
      const newItem = await Item.create({
        name,
        description,
        price,
        category,
        image,
      });
      res.status(201).json(newItem);
    } catch (error) {
      console.error('Error adding item:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  })
  // Routes for Tier III
  router.delete('/items/:id', async (req, res) => {
    const itemId = req.params.id;
    try {
      const item = await Item.findByPk(itemId);
      if (item) {
        await item.destroy();
        res.json({ message: 'Item deleted successfully' });
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });



module.exports = router;