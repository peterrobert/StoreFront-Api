const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
    },
    lastname: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
    },
    email: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true
    },
    password: {
        type: String,
        minlength: 6,
        maxlength: 255,
        required: true
    }
})

const User = mongoose.model('user', userSchema);

// == JOI VALIDATION ==

const userValidation = (obj) => {
   const schema = {
       firstname: Joi.string().required().min(3).max(50),
       lastname: Joi.string().required().min(3).max(50),
       email: Joi.string().required().min(3).max(255),
       password: Joi.string().required().min(6).max(255)
   }

 return Joi.validate(obj, schema)
}

exports.userValidation = userValidation;
exports.User = User;

