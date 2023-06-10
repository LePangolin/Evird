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


router.get("/", async (req, res, next) => {
    const files = fs.readdirSync(path.join(__dirname, "..", "public", "uploads"));
    res.status(200).send({ files });
});

router.get("/:fileName", async (req, res, next) => {
    console.log(req.params.fileName);
    const fileName = req.params.fileName;
    let file = fs.readFileSync(path.join(__dirname, "..", "public", "uploads", fileName));
    file = new Buffer.from(file).toString('base64');
    const mimeType = "image/" + fileName.split(".")[1];
    const b64 = file;
    res.send(`data:${mimeType};base64,${b64}`);
});

router.get("/download/:fileName", async (req, res, next) => {
    const fileName = req.params.fileName;
    res.download(path.join(__dirname, "..", "public", "uploads", fileName));
});

// EXPORTS
module.exports = router;