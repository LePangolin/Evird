// IMPORT 
const express = require('express');
const axios = require('axios');

// VARIABLES
const router = express.Router();

// ROUTES
router.post('/signup', async (req, res) => {
    try {
        let result = await axios.post(process.env.USER_SERVICE_ROUTE + "/user/signup", req.body);
        const id = result.data.id;
        const token = result.data.token;
        const refresh = result.data.refresh;
        const name = result.data.name;
        result = await axios.post(process.env.UPLOAD_SERVICE_ROUTE + "/folder", { 
            id_creator: id,
            folderName: name
        });
        res.status(result.status).send({ 
            code : result.status,
            message : {
                id: id,
                token: token,
                refresh: refresh,
            }
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