const { Router } = require('express');
const { Item } = require('../models/index.js');

Router.get('/items', async(request, response, next) => {
    try{
        const items = await Item.findAll();
        response.send(items);
    }catch(error){
        next(error);
    }
})

module.exports = Router ;