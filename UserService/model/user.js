//  IMPORTS
const db = require('../helper/database');
const uuid = require('uuidv4');
const bcrypt = require('bcrypt');


// INTERACT WITH DATABASE
async function createUser(email, password, name, refresh) {
    if(!email || !password || !name || !refresh) {
        return false;
    }
    try {
        const salt = bcrypt.genSaltSync(parseInt(process.env.SALT));
        const hash = bcrypt.hashSync(password, salt);
        const id = uuid.uuid();
        let dbinsert = await db(process.env.DB_TABLE).insert({
            id: id,
            email: email,
            name: name,
            refresh_token: refresh,
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
        const user = await db(process.env.DB_TABLE).where('email', email).first();
        if(user) {
            const result = bcrypt.compareSync(password, user.password);
            if(result) {
                return {
                    id: user.id,
                    refresh: user.refresh_token
                }
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