// IMPORTS
const express = require('express');
const { createFolder , getFolderById, getMainFolderByUserId } = require('../model/folder');
const fs = require('fs');

// MIDDLEWARES
const { createFolderValidator } = require('../validator/folder_validator');

// VARIABLES
const router = express.Router();


// ROUTES
router.post('/', createFolderValidator, async (req, res) => {
    try {
        const isInsert = await createFolder(req.body.id_creator, req.body.folderName);
        if(!isInsert){
            return res.status(500).send('Folder not created');
        }else{
            try{
                fs.mkdirSync(`./uploads/${isInsert}`);
            }catch(err){
                console.log(err);
            }
            return res.status(201).send('Folder created');
        }
    } catch (error) {
        return res.status(500).send('Folder not created');   
    }
});


router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const folder = await getFolderById(id);
        if(!folder){
            return res.status(404).send('Folder not found');
        }else{
            return res.status(200).send(folder);
        }
    }catch(err){
        return res.status(500).send('Folder not found');
    }
});


router.get('/user/main/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const folder = await getMainFolderByUserId(id);
        if(!folder){
            return res.status(404).send('Folder not found');
        }else{
            return res.status(200).send(folder);
        }
    }catch(err){
        console.log(err);
        return res.status(500).send('Folder not found');
    }
});


// EXPORTS
module.exports = router;