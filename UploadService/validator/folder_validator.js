// IMPORTS
const joi = require('joi');

// VARIABLES
const schema = joi.object({
    id_creator: joi.string().required(),
    folderName: joi.string().required()
});

// VALIDATOR
function createFolderValidator(req, res, next){
    const { error } = schema.validate(req.body);
    if(error){
        return res.status(400).send({ msg: error.details[0].message });
    }
    next();
}

// EXPORTS
module.exports ={
    createFolderValidator
}