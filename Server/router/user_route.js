// IMPORT 
const express = require('express');
const axios = require('axios');

// VARIABLES
const router = express.Router();

// ROUTES
router.post('/signup', async (req, res) => {
    try {
        const result = await axios.post(process.env.USER_SERVICE_ROUTE + "/user/signup", req.body);
        if(result) {
            res.status(result.status).send(result.data);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send('User not created');
    }
});

router.post('/login', async (req, res) => {
    try {
        const result = await axios.post(process.env.USER_SERVICE_ROUTE + "/user/login", req.body);
        if(result) {
            res.status(result.status).send(result.data);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send('User not logged in');
    }
});

// EXPORTS
module.exports = router;