// IMPORTS
const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');

// VARIABLES
const app = express();

// MIDDLEWARES
app.use(fileUpload());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES
app.use("/js", express.static("./public/js"));
app.use("/upload", require("./router/upload_route"));
app.use("/", require("./router/base_route"));

// LUNCH SERVER
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});