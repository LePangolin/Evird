// IMPORTS
const express = require('express');
const fs = require('fs');
const path = require('path');

// VARIABLES
const router = express.Router();

// ROUTES
router.post("/", async (req, res, next) => {
    if(!req.files) {
        return res.status(401).send({ msg: "file is not found" })
    }else{
        try{

            // RECUPERATION DU FICHIER
            const files = req.files;
            
            // DEPLACEMENT DU FICHIER
            Object.keys(files).forEach(key => {
                const file = files[key];
                const fileName = file.name;
                files[key].mv(path.join(__dirname, "..", "public", "uploads", fileName), (err) => {
                    if(err){
                        return res.status(500).send({ msg: "Error occured" });
                    }
                });
            });
            
            return res.status(201).send({ msg: "File uploaded" });

        }catch(e){
            console.log(e);
            res.status(500).send({ msg: "Error occured" });
        }
    }
});

// EXPORTS
module.exports = router;