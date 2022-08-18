const joi = require('joi')

const profileValidation = (data) => {
    const schemaValidation = joi.object({
        firstname:joi.string().required().min(2).max(256),
        lastname:joi.string().required().min(2).max(256),
        birthday:joi.string().required().min(6).max(20)        
    })
    return schemaValidation.validate(data)
}

module.exports.profileValidation = profileValidation
