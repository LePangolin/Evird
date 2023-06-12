// IMPORTS
const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');

// VARIABLES
const app = express();

// MIDDLEWARES
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES

// LAUNCH
app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port 3000.');
});
