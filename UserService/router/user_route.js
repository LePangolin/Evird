// IMPORTS
const express = require('express');
const { createUser, loginUser } = require('../model/user');
const jwt = require('jsonwebtoken');

// VARIABLES
const router = express.Router();

// MIDDLEWARES
const { validateInsert } = require('../validator/user_validator');
const { validateLogin } = require('../validator/user_validator');

// ROUTES
router.post('/signup', validateInsert, async (req, res) => {
    try {
      const result = await createUser(req.body.email, req.body.password);
      if(result) {
        const token = jwt.sign({ id: result }, process.env.JWT_SECRET);
        return res.status(201).send({
            message: 'User created',
            token: token
        });
      } else {
        return res.status(500).send('User not created');
      }
    } catch (error) {
        return res.status(500).send('User not created');
    } 
});

router.post('/login', validateLogin, async (req, res) => {
    try {
        const result = await loginUser(req.body.email, req.body.password);
        if(result) {
            const token = jwt.sign({ id: result }, process.env.JWT_SECRET);
            return res.status(200).send({
                message: 'User logged in',
                token: token
            });
        } else {
            return res.status(500).send('User not logged in');
        }
    } catch (error) {
        return res.status(500).send('User not logged in');
    }
});

// EXPORTS
module.exports = router;