// IMPORT 
const express = require('express');
const axios = require('axios');

// VARIABLES
const router = express.Router();

// ROUTES
router.post('/signup', async (req, res) => {
    try {
        let result = await axios.post(process.env.USER_SERVICE_ROUTE + "/user/signup", req.body);
        res.status(result.status).send({
            code : result.status,
            message : result.data
        });
    } catch (error) {
        res.status(error.response.status).send({
            code : error.response.status,
            message : error.response.data
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        let result = await axios.post(process.env.USER_SERVICE_ROUTE + "/user/login", req.body);
        res.status(result.status).send({
            code : result.status,
            message : result.data
        });
    } catch (error) {
        res.status(error.response.status).send({
            code : error.response.status,
            message : error.response.data
        });
    }
});

// EXPORTS
module.exports = router;