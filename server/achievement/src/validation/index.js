const joi = require('joi')

const storyValidation = (data) => {
    const schemaValidation = joi.object({
        title:joi.string().required().min(2).max(256),
        description:joi.string().required().min(6).max(256) 
    })
    return schemaValidation.validate(data)
}

module.exports.storyValidation = storyValidation
