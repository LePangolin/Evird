// IMPORT 
const joi = require('joi');

// VARIABLES
const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});

const schemaLogin = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});


// VALIDATOR
async function validateInsert(req, res, next) {
    try {
        const { error } = await schema.validateAsync(req.body);
        if(error) {
            return res.status(400).send(error.details[0].message);
        }
        next();
    } catch (error) {
        return false;
    }
}

async function validateLogin(req, res, next) {
    try {
        const { error } = await schemaLogin.validateAsync(req.body);
        if(error) {
            return res.status(400).send(error.details[0].message);
        }
        next();
    } catch (error) {
        return false;
    }
}

// EXPORTS
module.exports = {
    validateInsert,
    validateLogin
}
