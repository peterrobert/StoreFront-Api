const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

// ==== Custom modules
const {categorySchema} = require('./category')
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    price: {
        type: Number,
        required: true,
        minlength: 0,
    },
    category: categorySchema
});

const Product = mongoose.model('product', productSchema)

// ==== Validations
const productValidation = (obj) => {
    const schema = {
        name: Joi.string().required().min(3).max(255),
        price: Joi.string().required().min(0),
        categoryID: Joi.objectId().required()
    }
  return Joi.validate(obj, schema)
}


exports.Product = Product;
exports.productValidation = productValidation;
