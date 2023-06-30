// IMPORTS
const express = require("express");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const formdata = require("form-data");

// VARIABLES
const router = express.Router();

// ROUTES
router.post("/:id", async (req, res, next) => {
  let id = null;
  let refresh = null;
  let token = null;
  if (req.headers.authorization === undefined) {
    return res.status(401).send("Unauthorized");
  } else {
    try {
      const resultConfirm = await axios.post(
        process.env.USER_SERVICE_ROUTE + "/user/verify",
        {},
        { headers: { Authorization: req.headers.authorization } }
      );
      if (resultConfirm.data.id) {
        id = resultConfirm.data.id;
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 401) {
        try {
          const resultRefresh = await axios.post(
            process.env.USER_SERVICE_ROUTE + "/user/refresh",
            {},
            { headers: { Authorization: req.headers.authorization } }
          );
          if (resultRefresh.data.token) {
            id = resultRefresh.data.id;
            refresh = resultRefresh.data.refresh;
            token = resultRefresh.data.token;
          }
        } catch (err) {
          console.log(err);
          return res.status(401).send("Unauthorized");
        }
      }
    }
  }

  if (id) {
    try {
      try {
        const files = req.files;
        
        let paths = [];

        Object.keys(files).forEach((key) => {
          const file = files[key];
          const fileName = file.name;
          const filePath = path.join("./tmp/", fileName);
          paths.push(filePath);
          file.mv(filePath, (err) => {
            if (err) {
              console.log(err);
              return res.status(500).send("Internal Server Error");
            }
          });
        });
        
        const formData = new formdata();
        paths.forEach((path) => {
          formData.append("file" , fs.createReadStream(path));
        });

        const result = await axios.post(
          process.env.UPLOAD_SERVICE_ROUTE + "/upload/" + req.params.id,
          formData,
          {
            headers: {
              Authorization: token,
              ...formData.getHeaders(),
              MaxContentLength: Infinity,
            },
          }
        );
        
        if(result.status === 201){
          paths.forEach((path) => {
            fs.unlinkSync(path);
          });
        }

        return res.status(result.status).send({
          data: result.data,
          token: token,
          refresh: refresh,
        });

      } catch (err) {
        console.log(err);
        return res.status(err.response.status).send(err.response.data);
      }
    } catch (err) {
      return res.status(err.response.status).send(err.response.data);
    }
  } else {
    return res.status(401).send("Unauthorized");
  }
});

// EXPORTS
module.exports = router;
