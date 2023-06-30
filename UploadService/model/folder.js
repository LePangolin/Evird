// IMPORTS
const db = require('../helper/database');
const uuid = require('uuidv4');
const { getFileFromFolder } = require('./upload');

// INTERACTION A LA BASE DE DONNEE
async function createFolder(idCreator, folderName){
    const id = uuid.uuid();
    const folderInsert = await db(process.env.DB_TABLE2).insert({
        id: id,
        id_createur: idCreator,
        name: folderName
    });
    if(folderInsert){
        return id;
    }else{
        return false;
    }
}

async function getFolderById(id){
    const folder = await db(process.env.DB_TABLE2).where({
        id: id
    });
    if(folder.length > 0){
        return folder[0];
    }else{
        return false;
    }
}

async function asAccesstoFolder(idUser, idFolder){
    const result = await db(process.env.DB_TABLE2).where({
        id: idFolder,
        id_createur: idUser
    });
    if(result.length > 0){
        return true;
    }else{
        const result2 = await db(process.env.DB_TABLE3).where({
            id_folder: idFolder,
            id_user: idUser
        });
        if(result2.length > 0){
            return true;
        }else{
            return false;
        }
    }
}

async function getMainFolderByUserId(id){
    const folder = await db(process.env.DB_TABLE2).where({
        id_createur: id
    });
    if(folder.length > 0){
        // take the older folder
        let older = folder[0];
        for(let i = 1; i < folder.length; i++){
            if(folder[i].created_at < older.created_at){
                older = folder[i];
            }
        }
        const files = await getFileFromFolder(older.id);
        let size = 0;
        if(files){
            older.files = {
                data : files,
                number : files.length
            }
        }else{
            older.files = {
                data : [],
                number : 0
            }
        }
        return older;
    }else{
        return false;
    }
}


// EXPORTS
module.exports = {
    createFolder,
    getFolderById,
    asAccesstoFolder,
    getMainFolderByUserId
}