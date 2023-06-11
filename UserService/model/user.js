//  IMPORTS
const db = require('../helper/database');
const uuid = require('uuidv4');
const bcrypt = require('bcrypt');


// INTERACT WITH DATABASE
async function createUser(email, password) {
    if(!email || !password) {
        return false;
    }
    try {
        const salt = bcrypt.genSaltSync(parseInt(process.env.SALT));
        const hash = bcrypt.hashSync(password, salt);
        const id = uuid.uuid();
        let dbinsert = await db('user').insert({
            id: id,
            name: email,
            password: hash
        });
        if(dbinsert) {
            return id;
        }else{
            return false;
        }
    }catch(error) {
        console.log(error);
        return false;
    }
}

async function loginUser(email, password) {
    if(!email || !password) {
        return false;
    }
    try {
        const user = await db('user').where('name', email).first();
        if(user) {
            const result = bcrypt.compareSync(password, user.password);
            if(result) {
                return user.id;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } catch(error) {
        console.log(error);
        return false;
    }
}


module.exports = {
    createUser,
    loginUser
}