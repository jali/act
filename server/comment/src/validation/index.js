const joi = require('joi')

const commentValidation = (data) => {
    const schemaValidation = joi.object({
        object_id:joi.string().required().min(20).max(256),
        message:joi.string().required().min(2).max(256),
        profile_data:joi.array(),
        liked_data:joi.arra()        
    })
    return schemaValidation.validate(data)
}

module.exports.commentValidation = commentValidation
