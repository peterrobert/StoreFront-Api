const express = require('express');
const { User } = require('../models/user');
const Router = express.Router();
const bcrypt = require('bcrypt');
const generateToken = require('../logic')
const _ = require('lodash');
const Joi = require("joi");

Router.post('/', (req, res) => {

      // =====Validate User data
  const validateUser = (obj) => {
    const schema = {
      email: Joi.string().required().min(5).max(255),
      password: Joi.string().required().min(6).max(255)
    }

    return Joi.validate(obj, schema)
  }

  const logInUser = async (obj) => {
    const user = await User.findOne({email: obj.email});
    if(!user) return res.status(404).send("Wrong email or password");

    // === Compare provided password with the ecrypted password
    const results = await bcrypt.compare(obj.password, user.password);
    if(!results) return res.status(404).send("Wrong email or password");

    // === Authentication Token
    const Token = generateToken(user);
    res.header('x-auth-token', Token).send(_.pick(user, ['_id', 'firstname', 'lastname', 'email']))
  }


     validateUser(req.body).then((data) => {
         logInUser(data);
     }).catch((err) => {
        res.status(404).send(err.details[0].message)
     })
})



module.exports = Router;
