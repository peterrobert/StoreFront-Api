const express = require('express');
const Router = express.Router();
// ==== Custom models
const { Category, categoryValidation } = require('../models/category');

Router.get('/', async (req, res) => {
    const categories = await Category.find();
    if (categories.length < 1) return res.status(200).send('There are no categories at the moment');

    res.status(200).send(categories)
})

Router.post('/', (req, res) => {
    const createCategory = async (obj) => {
        try {
            const category = new Category(obj);
            const results = await category.save()
            res.status(201).send(results)
        } catch (error) {
            res.status(500).send(error)
        }
    }
    // ==== Validate user input.
    let results = categoryValidation(req.body)
    results.then((data) => {
        createCategory(data)
    }).catch((err) => {
        res.status(404).send(err.details[0].message)
    })
})

Router.get('/:id', (req, res) => {
    
})



module.exports = Router