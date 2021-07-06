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



exports.categorySchema = categorySchema;
