const express = require('express');
const Router = express.Router();
// == Custom modules;
const { Product, productValidation } = require('../models/product');
const {Category} = require('../models/category')

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

    const createProduct = async (obj) => {
        const category = await Category.findById(obj.categoryID)
        const product = new Product({
            name: obj.name,
            price: obj.price,
            category: category
        });
        const data = await product.save();
        res.status(201).send(data)
    }

    // ==== VALIDATION
    let results = productValidation({
        name: req.body.name,
        price: req.body.price,
        categoryID: req.params.categoryID
    })

    results.then((data) => {
        createProduct(data);
    }).catch((err) => {
        res.status(404).send(err.details[0].message)
    })
})


module.exports = Router