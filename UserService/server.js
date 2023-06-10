// IMPORTS
const express = require('express');

// VARIABLES
const app = express();

// ROUTES

// LAUNCH SERVER
app.listen(process.env.PORT, () => {
    console.log('User Service is running on port ' + process.env.PORT);
});