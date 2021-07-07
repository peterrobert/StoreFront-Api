const express = require('express');
const Router = express.Router();
// == Custom modules;
const { Product, productValidation } = require('../models/product');

Router.get('/', async (req, res) => {
    try {
        const results = await Product.find();
        if (results.length < 1) return res.status(200).send('There are no products yet');
        res.status(200).send(results)
    } catch (error) {
        res.send(error.message)
    }
})

Router.post('/:categoryID', (req, res) => {
    
      
    // ==== VALIDATION

})


module.exports = Router