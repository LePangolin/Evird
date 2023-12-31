// IMPORTS
const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

// VARIABLES
const app = express();

// MIDDLEWARES
app.use(fileUpload());
app.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: true }));
app.use(cors(
    {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', "PATCH", "OPTIONS"],
    })
)

app.use("/upload", require("./router/upload_route"));
app.use("/folder", require("./router/folder_route"));
app.use("/", require("./router/base_route"));

// ROUTES SERVICES
app.use("/user", require("./router/user_route"));

// LUNCH SERVER
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});