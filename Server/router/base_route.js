// IMPORTS
const express = require('express');

// VARIABLES
const router = express.Router();

// ROUTES
router.get("/", async (req, res, next) => {
    res.sendFile("/public/html/index.html", { root: "." });
});

// EXPORTS
module.exports = router;