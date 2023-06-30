// IMPORTS
const express = require('express');
const axios = require('axios');

// VARIABLES
const router = express.Router();

// ROUTES
router.get('/:id', async (req, res) => {
    if(req.headers.authorization === undefined){
        return res.status(401).send('Unauthorized');
    }else{
        let id = null;
        let refresh = null;
        let token = null;
        try{
          const resultConfirm = await axios.post(process.env.USER_SERVICE_ROUTE + "/user/verify", {  } , { headers: { Authorization: req.headers.authorization } });
          if(resultConfirm.data.id){
            id = resultConfirm.data.id;
          }
        }catch(err){
          if(err.response.status === 401){
            try{
                const resultRefresh = await axios.post(process.env.USER_SERVICE_ROUTE + "/user/refresh", {  } , { headers: { Authorization: req.headers.authorization } });
                if(resultRefresh.data.token){
                    id = resultRefresh.data.id;
                    refresh = resultRefresh.data.refresh;
                    token = resultRefresh.data.token;
                }
            }catch(err){
                return res.status(401).send('Unauthorized');
            }
          }
        }

        if(id){
            try{
                const result = await axios.get(process.env.UPLOAD_SERVICE_ROUTE + "/folder/" + req.params.id, { headers: { Authorization: token } });
                return res.status(result.status).send({
                    data: result.data,
                    token: token,
                    refresh: refresh
                });
            }catch(err){
                return res.status(err.response.status).send(err.response.data);
            }
        }else{
            return res.status(401).send('Unauthorized');
        }

    }
})


router.get('/user/main', async (req, res) => {
    if(req.headers.authorization === undefined){
        return res.status(401).send('Unauthorized');
    }else{
        let id = null;
        let refresh = null;
        let token = null;
        try{
          const resultConfirm = await axios.post(process.env.USER_SERVICE_ROUTE + "/user/verify", {  } , { headers: { Authorization: req.headers.authorization } });
          if(resultConfirm.data.id){
            id = resultConfirm.data.id;
          }
        }catch(err){
          if(err.response.status === 401){
            try{
                const resultRefresh = await axios.post(process.env.USER_SERVICE_ROUTE + "/user/refresh", {  } , { headers: { Authorization: req.headers.authorization } });
                if(resultRefresh.data.token){
                    id = resultRefresh.data.id;
                    refresh = resultRefresh.data.refresh;
                    token = resultRefresh.data.token;
                }
            }catch(err){
                return res.status(401).send('Unauthorized');
            }
          }
        }

        if(id){
            try{
                const result = await axios.get(process.env.UPLOAD_SERVICE_ROUTE + "/folder/user/main/" + id, { headers: { Authorization: token } });
                return res.status(result.status).send({
                    data: result.data,
                    token: token,
                    refresh: refresh
                });
            }catch(err){
                return res.status(err.response.status).send(err.response.data);
            }
        }else{
            return res.status(401).send('Unauthorized');
        }

    }
})

module.exports = router;

