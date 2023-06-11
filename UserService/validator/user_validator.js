// IMPORT 
const joi = require('joi');

// VARIABLES
const schema = joi.object({
    email: joi.string().email().required(),
    name: joi.string().required(),
    password: joi.string().required()
});

const schemaLogin = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});


// VALIDATOR
function validateInsert(req, res, next) {
    try {
        const { error } = schema.validate(req.body);
        if(error) {
            return res.status(400).send(error.details[0].message);
        }
        next();
    } catch (error) {
        return false;
    }
}

function validateLogin(req, res, next) {
    try {
        const { error } = schemaLogin.validate(req.body);
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
