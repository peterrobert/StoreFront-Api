const express = require('express');
const Router = express.Router();
const bcrypt = require('bcrypt');

// === CUSTOM MODULES ===
const { userValidation, User } = require('../models/user');
const generateToken = require('../logic')
// ==== SALT ROUNDS
const saltRounds = 10;

Router.post('/', (req, res) => {
    const registerUser = async (obj) => {
        // == CHECK IF USER WITH THAT EMAIL EXISTS
        const checkUser = await User.findOne({ email: obj.email });
        if (checkUser) return res.status(400).send('The email has already been taken!!')
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(obj.password, salt);

        const userObj = {
            firstname: obj.firstname,
            lastname: obj.lastname,
            email: obj.email,
            password: hashedPassword
        }
        try {
            const user = new User(userObj);
            const results = await user.save();
            const token = generateToken(results);

            req.header('x-auth-token', token)
        } catch (error) {
            console.log(error)
        }
    }

    // == VALIDATION == 
    userValidation(req.body).then((data) => {
        registerUser(data)
    }).catch((err) => {
        res.status(404).send(err.details[0].message)
    })
})



module.exports = Router;

