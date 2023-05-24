const express = require('express');
const router = express.Router();
const { Item } = require('../models/index.js');

router.get('/items', async(req, res, next) => {
    try{
        const items = await Item.findAll();
        res.send(items);
    }catch(error){
        next(error);
    }
})

router.get('/items/:id', async(req, res, next) => {
    try{
        const { id } = req.params;
        const item = await Item.findByPk(id);
        res.json(item);
    }catch(error){
        next(error);
    }
})
module.exports = router ;