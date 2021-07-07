const mongoose = require('mongoose');
const Joi = require('joi');


const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
})

const Category = mongoose.model('category', categorySchema);
// ==== Validation
const categoryValidation = (obj) => {
    const schema = {
        name: Joi.string().required().min(3).max(255)
    }
    Joi.validate(obj, schema)
}


exports.categorySchema = categorySchema;
exports.Category = Category;
exports.categoryValidation = categoryValidation;
