const joi = require('joi')

const commentValidation = (data) => {
    const schemaValidation = joi.object({
        object_id:joi.string().required().min(20).max(256),
        message:joi.string().required().min(2).max(256),
        created_by:joi.object(),
        liked_by:joi.array()        
    })
    return schemaValidation.validate(data)
}

module.exports.commentValidation = commentValidation
