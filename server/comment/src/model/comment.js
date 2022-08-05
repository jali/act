const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    object_id: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    created_by: {},
    liked_by: [],
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Comment', commentSchema)