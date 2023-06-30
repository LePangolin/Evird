// IMPORTS
const db = require('../helper/database');
const uuidv4 = require('uuidv4');

// FUNCTIONS
async function getFileFromFolder(id){
    const file = await db(process.env.DB_TABLE1).where({
        id_dossier: id
    });
    if(file.length > 0){
        return file;
    }else{
        return false;
    }
}
async function insertFileInFolder(id, name, path, size, type){
    const idFile = uuidv4.uuid();
    const insert = await db(process.env.DB_TABLE1).insert({
        id_dossier: id,
        id: idFile,
        name: name,
        path: path,
        size: size,
        type: type
    });
    if(insert){
        return idFile;
    }else{
        return false;
    }

}

module.exports = {
    getFileFromFolder,
    insertFileInFolder
}