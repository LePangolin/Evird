// IMPORTS
const express = require('express');

// VARIABLES
const app = express();

// MIDDLEWARES
app.use(express.json());

// ROUTES
app.use("/user", require('./router/user_route'));

// LAUNCH SERVER
app.listen(process.env.PORT, () => {
    console.log('User Service is running on port ' + process.env.PORT);
});