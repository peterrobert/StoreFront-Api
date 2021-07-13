const express = require('express');
const Router = express.Router();
// == Custom modules;
const { Product, productValidation } = require('../models/product');
const { Category } = require('../models/category')

// == GET ALL PRODUCT ==
Router.get('/', async (req, res) => {
    try {
        const results = await Product.find();
        if (results.length < 1) return res.status(200).send('There are no products yet');
        res.status(200).send(results)
    } catch (error) {
        res.send(error.message)
    }
})

// == SORT THE PRODUCT WITH A CATEGORY ===
Router.get('/:categoryID', async (req, res) => {
    try {
        const product = await Product.find({
            "category._id": req.params.categoryID
        });
        if (product.length < 1) return res.status(200).send("There are no products in this category");
        res.status(200).send(product);
    } catch (error) {
        res.send(error.message)
    }
})

// == CREATE NEW PRODUCT ==
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

// == SHOW ==
Router.get('/:categoryID/:ID',  async (req, res) => {

    try {
        const results = await Product.findById(req.params.ID);
        if(!results) return res.status(404).send("There is no product with that given ID");
        res.status(200).send(results);
    } catch (error) {
        console.log(error)
    }
})

// == UPDATE ==
Router.put('/:categoryID/:ID', (req, res) => {
    const updateProduct = async (obj) => {
        try {
            const results = await Product.findByIdAndUpdate(req.params.ID, obj,{new: true});
            if(!results) return res.status(404).send("There is no product with that given ID");
            res.status(200).send(results);
        } catch (error) {
            console.log(error)
        }
    }

    // == VALIDATION ==
    const obj = {
        name: req.body.name,
        price: req.body.price,
        categoryID: req.params.categoryID,
    }

    productValidation(obj).then((data) => {
        updateProduct(data)
    }).catch((err) => {
        res.status(404).send(err.details[0].message)
    })

})


// == DELETE PRODUCT ==

Router.delete('/:categoryID/:ID', async(req, res,) => {
     const results = await Product.findOneAndDelete(req.params.ID);
     if(!results) return res.status(404).send("There is no product with that specific ID");
     res.status(200).send("The product is deleted successfully");
})

module.exports = Router