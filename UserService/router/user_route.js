// IMPORTS
const express = require('express');
const { createUser, loginUser } = require('../model/user');
const jwt = require('jsonwebtoken');
const { createRefreshToken } = require('../helper/refreshtoken');

// VARIABLES
const router = express.Router();

// MIDDLEWARES
const { validateInsert } = require('../validator/user_validator');
const { validateLogin } = require('../validator/user_validator');

// ROUTES
router.post('/signup', validateInsert, async (req, res) => {
    try {
      const refresh = createRefreshToken();
      const result = await createUser(req.body.email, req.body.password, req.body.name, refresh);
      if(result) {
        const token = jwt.sign({ id: result }, process.env.JWT_SECRET);
        return res.status(201).send({
            message: 'User created',
            id: result,
            name: req.body.name,
            token: token,
            refresh: refresh
        });
      } else {
        return res.status(400).send('Email déjà utilisé');
      }
    } catch (error) {
        return res.status(500).send('User not created');
    } 
});

router.post('/login', validateLogin, async (req, res) => {
    try {
        const result = await loginUser(req.body.email, req.body.password);
        if(result) {
            const token = jwt.sign({ id: result.id }, process.env.JWT_SECRET);
            return res.status(200).send({
                message: 'User logged in',
                token: token,
                refresh: result.refresh
            
            });
        } else {
            return res.status(500).send('User not logged in');
        }
    } catch (error) {
        return res.status(500).send('User not logged in');
    }
});


router.post('/refresh', async (req, res) => {
    try {
        let token = req.headers.authorization.split(' ');
        if(token[0] != "Bearer") {
            return res.status(401).send('User not logged in');
        }
        if(!token[1]) {
            return res.status(401).send('User not logged in');
        }
        if(result) {
            token = jwt.sign({ id: result.id }, process.env.JWT_SECRET);
            return res.status(200).send({
                message: 'User logged in',
                token: token,
                refresh: result.refresh
            });
        } else {
            return res.status(500).send('User not logged in');
        }
    } catch (error) {
        return res.status(500).send('User not logged in');
    }
});

router.post('/verify', async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ');
        if(token[0] != "Bearer") {
            return res.status(401).send('User not logged in');
        }
        if(!token[1]) {
            return res.status(401).send('User not logged in');
        }
        const decoded = jwt.verify(token[1], process.env.JWT_SECRET);
        if(decoded) {
            return res.status(200).send({
                message: 'User logged in',
                id: decoded.id
            });
        } else {
            return res.status(401).send('User not logged in');
        }
    } catch (error) {
        return res.status(500).send('User not logged in');
    }
});


// EXPORTS
module.exports = router;